import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';
import cx from 'clsx';

import { schema, xsd } from './Vocabularies';
import { useLoadedEntities } from './useLoadedEntities';

import './FormInputFile.css';

export const FileType = 'urn:reactodia:File';

export interface UploadedFile {
  readonly name: string;
  readonly metadata: Reactodia.ElementModel;
}

export interface FileUploadProvider {
  uploadFile(file: File, options?: { signal?: AbortSignal }): Promise<UploadedFile>;
  getFileMetadata(fileUrl: string): Reactodia.ElementModel | undefined;
  resolveFileUrl(fileUrl: string): Promise<string | undefined>;
}

export interface InMemoryUploadedFile extends UploadedFile {
  readonly blob: Blob;
}

export class InMemoryFileUploader implements FileUploadProvider {
  private static readonly IRI_PREFIX = 'urn:reactodia:in-memory-file:';

  private readonly factory: Reactodia.Rdf.DataFactory;
  private readonly signal: AbortSignal;
  private readonly uploadedFiles = new Map<string, InMemoryUploadedFile>();
  private readonly objectUrls = new WeakMap<InMemoryUploadedFile, string>();

  constructor(options: {
    factory: Reactodia.Rdf.DataFactory;
    signal: AbortSignal;
  }) {
    const {factory, signal} = options;
    this.factory = factory;
    this.signal = signal;
    this.signal.addEventListener('abort', () => {
      for (const file of this.uploadedFiles.values()) {
        const objectUrl = this.objectUrls.get(file);
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      }
      this.uploadedFiles.clear();
    });
  }

  files(): Iterable<InMemoryUploadedFile> {
    return this.uploadedFiles.values();
  }

  getFileMetadata(fileUrl: string): Reactodia.ElementModel | undefined {
    return this.uploadedFiles.get(fileUrl)?.metadata;
  }

  async uploadFile(file: File, options: { signal?: AbortSignal; } = {}): Promise<UploadedFile> {
    const {signal} = options;
    signal?.throwIfAborted();
    this.signal.throwIfAborted();
    const timestamp = new Date().toISOString().replaceAll(/[Z\s:-]/g, '');
    const name = `${timestamp}_${file.name}`;
    const uploaded: InMemoryUploadedFile = {
      name,
      metadata: {
        id: InMemoryFileUploader.IRI_PREFIX + name,
        types: [FileType],
        properties: {
          [Reactodia.rdfs.label]: [this.factory.literal(file.name)],
          [schema.encodingFormat]: file.type ? [this.factory.literal(file.type)] : [],
          [schema.fileSize]: [this.factory.literal(`${file.size}B`)],
          [schema.uploadDate]: [
            this.factory.literal(
              new Date().toISOString(),
              this.factory.namedNode(xsd.dateTime)
            )
          ],
        },
      },
      blob: file,
    };
    this.uploadedFiles.set(uploaded.metadata.id, uploaded);
    return {
      name: uploaded.name,
      metadata: uploaded.metadata,
    };
  }

  async resolveFileUrl(fileIri: string): Promise<string | undefined> {
    return this.resolveFileUrlSync(fileIri);
  }

  // Workaround: exposed as public for now to resolve from DataLocaleProvider
  resolveFileUrlSync(fileIri: string): string | undefined {
    const file = this.uploadedFiles.get(fileIri);
    if (!file) {
      return undefined;
    }
    let objectUrl = this.objectUrls.get(file);
    if (!objectUrl) {
      objectUrl = URL.createObjectURL(file.blob);
      this.objectUrls.set(file, objectUrl);
    }
    return objectUrl;
  }
}

export interface FormInputFileProps extends Reactodia.FormInputMultiProps {
  /**
   * Accepted [file types](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)
   * for the file selection.
   */
  fileAccept?: string;
  getFileKind?: (fileIri: string, fileEntity: Reactodia.ElementModel | undefined) => FormInputFileKind;
  uploader: FileUploadProvider;
}

export type FormInputFileKind = 'default' | 'image';

const CLASS_NAME = 'reactodia-property-input-file';

export function FormInputFile(props: FormInputFileProps) {
  const {fileAccept, getFileKind, uploader, shape, factory, values, updateValues} = props;
  const {model} = Reactodia.useWorkspace();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [operation, setOperation] = React.useState<AbortController>();
  const onSelect = async (files: File[]) => {
    const controller = new AbortController();
    setOperation(controller);
    let uploaded: UploadedFile[];
    try {
      uploaded = await Promise.all(files.map(file =>
        uploader.uploadFile(file, {signal: controller.signal}),
      ));
    } finally {
      controller.abort();
      setOperation(undefined);
    }

    const uploadedUrls = uploaded.map(file => factory.namedNode(file.metadata.id));
    updateValues(previousValues => {
      return [...previousValues, ...uploadedUrls];
    });
  };

  const onRemove = (value: Reactodia.Rdf.NamedNode | Reactodia.Rdf.Literal) => {
    updateValues(previous => previous.filter(v => !Reactodia.Rdf.equalTerms(v, value)));
  };

  const {entities} = useLoadedEntities(
    model.dataProvider,
    values.filter(v => v.termType === 'NamedNode').map(v => v.value)
  );

  const displayedProperties: Reactodia.PropertyTypeIri[] = [
    schema.encodingFormat,
    schema.fileSize
  ];

  return (
    <DropZone className={CLASS_NAME}
      onSelect={onSelect}>
      {values.map((v, i) => {
        const data = uploader.getFileMetadata(v.value) ?? entities.get(v.value);
        const kind = getFileKind?.(v.value, data);
        return (
          <FileItem key={i}
            iri={v.value}
            data={data}
            kind={kind}
            displayedProperties={displayedProperties}
            onRemove={() => onRemove(v)}
          />
        );
      })}
      {operation ? (
        <div className={`${CLASS_NAME}__spinner`}>
          <Reactodia.HtmlSpinner width={50} height={50} />
        </div>
      ) : !shape.maxCount || values.length < shape.maxCount ? (
        <div className={`${CLASS_NAME}__placeholder`}>
          <div className={`${CLASS_NAME}__hint`}>Drag files over or</div>
          <button className={`${CLASS_NAME}__select-file reactodia-btn reactodia-btn-default`}
            type='button'
            onClick={() => inputRef.current?.click()}>
            Select files
          </button>
        </div>
      ) : null}
      <input ref={inputRef}
        type='file'
        className={`${CLASS_NAME}__input`}
        accept={fileAccept}
        onChange={e => {
          if (e.currentTarget.files && e.currentTarget.files.length > 0) {
            onSelect(Array.from(e.currentTarget.files));
          }
        }}
      />
    </DropZone>
  );
}

function FileItem(props: {
  iri: string;
  data: Reactodia.ElementModel | undefined;
  kind?: FormInputFileKind;
  displayedProperties: readonly Reactodia.PropertyTypeIri[];
  onRemove: () => void;
}) {
  const {iri, data, kind, displayedProperties, onRemove} = props;
  const {model, translation: t} = Reactodia.useWorkspace();

  Reactodia.useKeyedSyncStore(
    Reactodia.subscribePropertyTypes,
    displayedProperties.filter(property => data && Object.hasOwn(data.properties, property)),
    model
  );

  const title = model.locale.formatIri(iri);
  return (
    <div className={`${CLASS_NAME}__item`} title={title}>
      {kind === 'image'
        ? <img className={`${CLASS_NAME}__item-thumbnail`} src={iri} />
        : <div className={`${CLASS_NAME}__item-thumbnail`}>📄</div>}
      <div className={`${CLASS_NAME}__item-properties`}>
        <div className={`${CLASS_NAME}__item-label`}>
          {data
            ? model.locale.formatEntityLabel(data, model.language)
            : t.formatLabel([], iri, model.language)}
        </div>
        {displayedProperties.map(propertyIri => {
          if (data && Object.hasOwn(data.properties, propertyIri)) {
            const property = model.createPropertyType(propertyIri);
            const values = data.properties[propertyIri];
            return (
              <div className={`${CLASS_NAME}__item-property`} key={propertyIri}>
                <span>{t.formatLabel(property.data?.label, iri, model.language)}</span>{': '}
                {values.length === 0 ? <span>&mdash;</span> : null}
                {values.map(v => v.value).join(', ')}
              </div>
            )
          }
          return null;
        })}
      </div>
      <button type='button'
        className={cx(
          'reactodia-btn',
          'reactodia-btn-default',
          `${CLASS_NAME}__item-remove`,
          // TODO: remove
          'reactodia-property-input-list__value-remove',
        )}
        title={t.text('visual_authoring.property.remove_value.title')}
        onClick={onRemove}
      />
    </div>
  );
}

function DropZone(props: {
  className?: string;
  onSelect: (files: File[]) => void;
  children?: React.ReactNode;
}) {
  const {className, onSelect, children} = props;
  return (
    <div className={className}
      data-reactodia-drop-zone>
      {children}
    </div>
  );
}
