import * as Reactodia from '@reactodia/workspace';
import * as Forms from '@reactodia/workspace/forms';

import { GenealogicalPackage } from './GenealogicalPackage';
import { schema } from './Vocabularies';

export class GenealogicalDataProvider extends Reactodia.RdfDataProvider {
  readonly uploader: Forms.MemoryFileUploader;

  private _dataset = Reactodia.indexedDataset(
    Reactodia.IndexQuadBy.SP
  );

  constructor(
    readonly sourcePackage: GenealogicalPackage,
    options: {
      uploader: Forms.MemoryFileUploader;
      signal: AbortSignal;
    }
  ) {
    super({
      datatypePredicates: [schema.gender, Reactodia.schema.thumbnailUrl],
    });
    const {uploader} = options;
    this.uploader = uploader;
    this.addGraph(sourcePackage.graph);
    this._dataset.addAll(sourcePackage.graph);
  }

  async elements(params: {
    elementIds: ReadonlyArray<Reactodia.ElementIri>;
    signal?: AbortSignal;
  }): Promise<Map<Reactodia.ElementIri, Reactodia.ElementModel>> {
    const result = await super.elements(params);
    return new Map(
      Array.from(result).map(([iri, entity]) => [iri, this.transformEntity(entity)])
    );
  }

  async lookup(params: Reactodia.DataProviderLookupParams): Promise<Reactodia.DataProviderLookupItem[]> {
    const result = await super.lookup(params);
    return result.map(item => ({
      ...item,
      element: this.transformEntity(item.element),
    }));
  }

  private transformEntity(entity: Reactodia.ElementModel): Reactodia.ElementModel {
    if (entity.types.includes(schema.Person)) {
      const genderValues = Object.hasOwn(entity.properties, schema.gender)
        ? entity.properties[schema.gender] : undefined;
      const gender = genderValues && genderValues.length === 1 ? genderValues[0] : undefined;
      if (gender && gender.termType === 'NamedNode') {
        if (gender.value === schema.Male) {
          const types = [...entity.types, schema.Male].sort();
          return {...entity, types};
        } else if (gender.value === schema.Female) {
          const types = [...entity.types, schema.Female].sort();
          return {...entity, types};
        }
      }
    }
    return entity;
  }

  cleanupAuthoring(state: Reactodia.AuthoringState): Reactodia.AuthoringState {
    return state;
  }
}

export class GenealogicalLocaleProvider extends Reactodia.DefaultDataLocaleProvider {
  private readonly uploader: Forms.MemoryFileUploader;
  private readonly package: GenealogicalPackage;

  constructor(options: Reactodia.DefaultDataLocaleProviderOptions & {
    uploader: Forms.MemoryFileUploader;
    package: GenealogicalPackage;
  }) {
    super(options);
    this.uploader = options.uploader;
    this.package = options.package;
  }

  override selectEntityImageUrl(entity: Reactodia.ElementModel): string | undefined {
    return entity.types.includes(Forms.FileType)
      ? entity.id : super.selectEntityImageUrl(entity);
  }

  async resolveAssetUrl(assetIri: string, options: { signal?: AbortSignal; }): Promise<string> {
    const {signal} = options;
    const [uploadUrl, packageUrl] = await Promise.all([
      this.uploader.resolveFileUrl(assetIri, {signal}),
      this.package.resolveFileUrl(assetIri, {signal}),
    ]);
    return uploadUrl ?? packageUrl ?? assetIri;
  }
}

export function findGenealogicalProvider(rootProvider: Reactodia.DataProvider) {
  if (!(rootProvider instanceof Reactodia.CompositeDataProvider)) {
    throw new Error('Cannot find composite data provider');
  }
  const mainProvider = rootProvider.providers
    .map(p => p.provider)
    .find(p => p instanceof GenealogicalDataProvider);
  if (!mainProvider) {
    throw new Error('Cannot find main data provider');
  }
  return mainProvider;
}
