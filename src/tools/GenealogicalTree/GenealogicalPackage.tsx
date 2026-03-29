import { HashMap } from '@reactodia/hashmap';
import * as Reactodia from '@reactodia/workspace';
import * as Forms from '@reactodia/workspace/forms';
import * as zip from '@zip.js/zip.js';
import * as N3 from 'n3';

import { applyRdfChanges } from './ApplyRdfChanges';
import { genealogy, rdfs, schema, xsd } from './Vocabularies';

export class GenealogicalPackage {
  private static readonly FILE_IRI_PREFIX = 'urn:reactodia:genealogical-package:file:';

  static readonly DEFAULT_NAMESPACE_BASE = 'http://reactodia.github.io/genealogy-graph/';

  private readonly imageNameToUrl = new Map<string, string>();

  private constructor(
    readonly diagram: Reactodia.SerializedDiagram | undefined,
    readonly graph: readonly Reactodia.Rdf.Quad[],
    private readonly prefixes: Readonly<Record<string, string>>,
    private readonly entries: zip.Entry[],
    private readonly signal: AbortSignal,
  ) {
    signal.throwIfAborted();
    signal.addEventListener('abort', () => {
      for (const imageUrl of this.imageNameToUrl.values()) {
        URL.revokeObjectURL(imageUrl);
      }
    });
  }

  static createEmpty(): GenealogicalPackage {
    const factory = Reactodia.Rdf.DefaultDataFactory;
    const controller = new AbortController();
    const graph: Reactodia.Rdf.Quad[] = [
      factory.quad(
        factory.namedNode(genealogy.ActiveSettings),
        factory.namedNode(Reactodia.rdf.type),
        factory.namedNode(genealogy.PackageSettings),
      ),
      factory.quad(
        factory.namedNode(genealogy.ActiveSettings),
        factory.namedNode(genealogy.defaultNamespaceBase),
        factory.literal(GenealogicalPackage.DEFAULT_NAMESPACE_BASE),
      ),
    ];
    return new GenealogicalPackage(undefined, graph, {}, [], controller.signal);
  }

  static async loadFromBytes(bytes: Uint8Array, options: { signal: AbortSignal }): Promise<GenealogicalPackage> {
    const {signal} = options;
    signal.throwIfAborted();

    const reader = new zip.ZipReader(new zip.Uint8ArrayReader(bytes));
    signal.addEventListener('abort', () => reader.close());

    const entries = await reader.getEntries();
    const diagramEntry = entries.find((e): e is zip.FileEntry => !e.directory && e.filename === 'diagram.json');
    const graphEntry = entries.find((e): e is zip.FileEntry => !e.directory && e.filename === 'graph.ttl');

    let diagram: Reactodia.SerializedDiagram | undefined;
    if (diagramEntry) {
      const diagramJson = await diagramEntry.getData(new zip.TextWriter());
      try {
        diagram = JSON.parse(diagramJson);
      } catch (err) {
        throw new Error('Failed to parse serialized diagram "diagram.json"', {cause: err});
      }
    }

    let graph: Reactodia.Rdf.Quad[] = [];
    let prefixes: Record<string, string> = Object.create(null);
    if (graphEntry) {
      const graphTurtle = await graphEntry.getData(new zip.TextWriter());
      try {
        graph = new N3.Parser().parse(graphTurtle, null, (prefix, node) => {
          prefixes[prefix] = node.value;
        });
      } catch (err) {
        throw new Error('Failed to parse serialized graph "graph.ttl"', {cause: err});
      }
    }

    return new GenealogicalPackage(diagram, graph, prefixes, entries, signal);
  }

  async resolveFileUrl(iri: string, options: { signal?: AbortSignal }): Promise<string | undefined> {
    this.signal.throwIfAborted();
    if (!iri.startsWith(GenealogicalPackage.FILE_IRI_PREFIX)) {
      return undefined;
    }
    const fileName = iri.substring(GenealogicalPackage.FILE_IRI_PREFIX.length);
    const cachedUrl = this.imageNameToUrl.get(fileName);
    if (cachedUrl) {
      return cachedUrl;
    }
    const entry = this.entries.find((e): e is zip.FileEntry => !e.directory && e.filename === `files/${fileName}`);
    if (entry) {
      const imageBlob = await entry.getData(new zip.BlobWriter(), {signal: options.signal});
      const imageUrl = URL.createObjectURL(imageBlob);
      this.imageNameToUrl.set(fileName, imageUrl);
      return imageUrl;
    }
    return undefined;
  }

  async exportWith(params: {
    dataProvider: Reactodia.RdfDataProvider;
    authoringState: Reactodia.AuthoringState;
    diagram: Reactodia.SerializedDiagram | undefined;
    uploader?: Forms.MemoryFileUploader;
  }): Promise<Blob> {
    const {dataProvider, authoringState: baseState, diagram, uploader} = params;
    const factory = Reactodia.Rdf.DefaultDataFactory;

    let authoringState = baseState;
    const termReplacements = new HashMap<Reactodia.Rdf.Term, Reactodia.Rdf.NamedNode>(
      Reactodia.Rdf.hashTerm,
      Reactodia.Rdf.equalTerms
    );

    if (uploader) {
      for (const file of uploader.files()) {
        authoringState = Reactodia.AuthoringState.addEntity(authoringState, file.metadata);
        termReplacements.set(
          factory.namedNode(file.metadata.id),
          factory.namedNode(GenealogicalPackage.FILE_IRI_PREFIX + file.name)
        );
      }
    }

    const dataset = applyRdfChanges({
      initialDataset: this.graph,
      authoringState,
      dataFactory: dataProvider.factory,
      decodeTerm: iri => dataProvider.decodeTerm(iri),
    });

    // Track referenced file content IRIs
    const referencedFiles = new Set<string>();
    const tryAddFileReference = (term: Reactodia.Rdf.Term) => {
      if (term.termType === 'NamedNode' && term.value.startsWith(GenealogicalPackage.FILE_IRI_PREFIX)) {
        const fileName = term.value.substring(GenealogicalPackage.FILE_IRI_PREFIX.length);
        referencedFiles.add(fileName);
      }
    };

    const quads = Array.from(dataset, q => {
      const nextSubject = termReplacements.get(q.subject);
      const nextObject = termReplacements.get(q.object);
      tryAddFileReference(nextSubject ?? q.subject);
      tryAddFileReference(nextObject ?? q.object);
      if (nextSubject || nextObject) {
        return factory.quad(nextSubject ?? q.subject, q.predicate, nextObject ?? q.object, q.graph);
      }
      return q;
    });
    quads.sort(Reactodia.Rdf.compareTerms);

    let defaultNamespace = GenealogicalPackage.DEFAULT_NAMESPACE_BASE;
    for (const {object: term} of dataset.iterateMatches(
      factory.namedNode(genealogy.ActiveSettings),
      factory.namedNode(genealogy.defaultNamespaceBase),
      null
    )) {
      defaultNamespace = term.value;
      break;
    }
    const graphTurtle = await serializeToTurtleString(quads, {
      ...this.prefixes,
      'genealogy': genealogy.$namespace,
      'rdfs': rdfs.$namespace,
      'schema': schema.$namespace,
      'xsd': xsd.$namespace,
      '': defaultNamespace,
    });

    const fileRenames = new Map<string, string>();
    for (const event of authoringState.elements.values()) {
      if (
        event.type === 'entityChange' && event.newIri &&
        event.before.id.startsWith(GenealogicalPackage.FILE_IRI_PREFIX) &&
        event.newIri.startsWith(GenealogicalPackage.FILE_IRI_PREFIX)
      ) {
        fileRenames.set(
          event.before.id.substring(GenealogicalPackage.FILE_IRI_PREFIX.length),
          event.newIri.substring(GenealogicalPackage.FILE_IRI_PREFIX.length)
        );
      }
    }

    const zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"));

    if (diagram) {
      await zipWriter.add('diagram.json', new zip.TextReader(JSON.stringify(diagram)));
    }

    await zipWriter.add('graph.ttl', new zip.TextReader(graphTurtle));

    for (const entry of this.entries) {
      if (!entry.directory && entry.filename.startsWith('files/')) {
        const fileName = entry.filename.substring('files/'.length);
        const newName = fileRenames.get(fileName) ?? fileName;
        if (referencedFiles.has(newName)) {
          zipWriter.add(`files/${newName}`, new zip.Uint8ArrayReader(new Uint8Array(
            await (entry as zip.FileEntry).arrayBuffer()
          )));
        }
      }
    }

    if (uploader) {
      for (const file of uploader.files()) {
        if (referencedFiles.has(file.name)) {
          zipWriter.add(`files/${file.name}`, new zip.BlobReader(file.blob));
        }
      }
    }

    return await zipWriter.close();
  }
}

function serializeToTurtleString(
  quads: readonly Reactodia.Rdf.Quad[],
  prefixes: Record<string, string>
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const turtleWriter = new N3.Writer();
    turtleWriter.addPrefixes(prefixes);
    turtleWriter.addQuads(quads as N3.Quad[]);
    turtleWriter.end((err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
