import * as React from 'react';
import * as Reactodia from '@reactodia/workspace';

const ENTITIES_CACHE = new WeakMap<Reactodia.DataProvider, CachedEntityLoader>();

class CachedEntityLoader {
  private readonly cache = new Map<Reactodia.ElementIri, Reactodia.ElementModel>();

  createEntityData(target: Reactodia.ElementIri): Reactodia.ElementModel {
    let data = this.cache.get(target);
    if (!data) {
      data = Reactodia.EntityElement.placeholderData(target);
      this.cache.set(target, data);
    }
    return data;
  }

  async requestData(targets: readonly Reactodia.ElementIri[], options: {
    dataProvider: Reactodia.DataProvider;
    signal?: AbortSignal;
  }): Promise<void> {
    const {dataProvider, signal} = options;
    const result = await dataProvider.elements({elementIds: targets, signal});
    for (const [target, data] of result) {
      this.cache.set(target, data);
    }
  }
}

interface LoadedEntitiesResult {
  readonly entities: ReadonlyMap<Reactodia.ElementIri, Reactodia.ElementModel>;
  readonly isLoading: boolean;
  readonly error?: unknown;
}

const EMPTY_ENTITIES: ReadonlyMap<Reactodia.ElementIri, Reactodia.ElementModel> = new Map();

export function useLoadedEntities(
  provider: Reactodia.DataProvider | undefined,
  iris: readonly Reactodia.ElementIri[]
): LoadedEntitiesResult {
  const [result, setResult] = React.useState<LoadedEntitiesResult>({
    entities: EMPTY_ENTITIES,
    isLoading: false,
  });

  const stableIrisRef = React.useRef<readonly Reactodia.ElementIri[]>(iris);
  const stableIris = Reactodia.shallowArrayEqual(stableIrisRef.current, iris)
    ? stableIrisRef.current : iris;

  React.useEffect(() => {
    stableIrisRef.current = stableIris;

    if (!provider || stableIris.length === 0) {
      setResult({entities: EMPTY_ENTITIES, isLoading: false});
      return;
    }

    let cache = ENTITIES_CACHE.get(provider);
    if (!cache) {
      cache = new CachedEntityLoader();
      ENTITIES_CACHE.set(provider, cache);
    }

    const entities = new Map<Reactodia.ElementIri, Reactodia.ElementModel>();
    const toRequest: Reactodia.ElementIri[] = [];
    for (const target of stableIris) {
      const data = cache.createEntityData(target);
      entities.set(target, data);
      if (Reactodia.EntityElement.isPlaceholderData(data)) {
        toRequest.push(target);
      }
    }

    const isLoading = toRequest.length > 0;
    setResult({entities, isLoading});

    if (isLoading) {
      const controller = new AbortController();
      cache.requestData(toRequest, { dataProvider: provider, signal: controller.signal })
        .then(
          () => {
            if (controller.signal.aborted) {
              return;
            }
            const loadedEntities = new Map<Reactodia.ElementIri, Reactodia.ElementModel>();
            for (const target of stableIris) {
              loadedEntities.set(target, cache.createEntityData(target));
            }
            setResult({entities: loadedEntities, isLoading: false});
          },
          (error) => {
            if (controller.signal.aborted) {
              return;
            }
            setResult(previous => ({...previous, isLoading: false, error}));
          },
        );
      return () => controller.abort();
    }
  }, [provider, stableIris]);
  return result;
}
