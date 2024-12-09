import * as Reactodia from '@reactodia/workspace';

const owl = vocabulary('http://www.w3.org/2002/07/owl#', [
    'Class',
    'AnnotationProperty',
    'DatatypeProperty',
    'ObjectProperty',
    'domain',
    'range',
]);

const rdfs = vocabulary('http://www.w3.org/2000/01/rdf-schema#', [
    'subClassOf',
    'subPropertyOf',
]);

const SIMULATED_DELAY: number = 200; /* ms */

export class ExampleMetadataProvider implements Reactodia.MetadataProvider {
    private readonly propertyTypes = [owl.AnnotationProperty, owl.DatatypeProperty, owl.ObjectProperty];
    private readonly editableTypes = new Set([owl.Class, ...this.propertyTypes]);

    async createEntity(
        type: Reactodia.ElementTypeIri,
        options: { readonly signal?: AbortSignal }
    ): Promise<Reactodia.ElementModel> {
        await delay(SIMULATED_DELAY, options.signal);
        const random32BitDigits = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);
        const typeLabel = Reactodia.Rdf.getLocalName(type) ?? 'Entity';
        return {
            id: `${type}_${random32BitDigits}` as Reactodia.ElementIri,
            types: [type],
            label: [Reactodia.Rdf.DefaultDataFactory.literal(`New ${typeLabel}`)],
            properties: {},
        };
    }

    async createRelation(
        source: Reactodia.ElementModel,
        target: Reactodia.ElementModel,
        linkType: Reactodia.LinkTypeIri,
        options: { readonly signal?: AbortSignal }
    ): Promise<Reactodia.LinkModel> {
        await delay(SIMULATED_DELAY, options.signal);
        return {
            sourceId: source.id,
            targetId: target.id,
            linkTypeId: linkType,
            properties: {},
        };
    }

    async canConnect(
        source: Reactodia.ElementModel,
        target: Reactodia.ElementModel | undefined,
        linkType: Reactodia.LinkTypeIri | undefined,
        options: { readonly signal?: AbortSignal }
    ): Promise<Reactodia.MetadataCanConnect[]> {
        await delay(SIMULATED_DELAY, options.signal);

        const connections: Reactodia.MetadataCanConnect[] = [];
        const addConnections = (
            types: readonly Reactodia.ElementTypeIri[],
            allOutLinks: readonly Reactodia.LinkTypeIri[],
            allInLinks: readonly Reactodia.LinkTypeIri[]
        ) => {
            const outLinks = linkType
                ? allOutLinks.filter(type => type === linkType)
                : allOutLinks;
            const inLinks = linkType
                ? allInLinks.filter(type => type === linkType)
                : allInLinks;
            if (types.length > 0 && (outLinks.length > 0 || inLinks.length > 0)) {
                connections.push({targetTypes: new Set(types), outLinks, inLinks});
            }
        };

        if (hasType(source, owl.Class)) {
            if (hasType(target, owl.Class)) {
                addConnections([owl.Class], [rdfs.subClassOf], [rdfs.subClassOf]);
            }

            const targetPropertyTypes = this.propertyTypes.filter(type => hasType(target, type));
            if (targetPropertyTypes.length > 0) {
                addConnections(targetPropertyTypes, [], [owl.domain, owl.range]);
            }
        }

        const sourcePropertyTypes = this.propertyTypes.filter(type => hasType(source, type));
        if (sourcePropertyTypes.length > 0) {
            for (const type of sourcePropertyTypes) {
                if (hasType(target, type)) {
                    addConnections([type], [rdfs.subPropertyOf], [rdfs.subPropertyOf]);
                }
            }

            if (hasType(target, owl.Class)) {
                addConnections([owl.Class], [owl.domain, owl.range], []);
            }
        }

        return connections;
    }

    async canModifyEntity(
        entity: Reactodia.ElementModel,
        options: { readonly signal?: AbortSignal; }
    ): Promise<Reactodia.MetadataCanModifyEntity> {
        await delay(SIMULATED_DELAY, options.signal);
        const editable = entity.types.some(type => this.editableTypes.has(type));
        return {
            canChangeIri: entity.types.includes(owl.Class),
            canEdit: editable,
            canDelete: editable,
        };
    }

    async canModifyRelation(
        link: Reactodia.LinkModel,
        source: Reactodia.ElementModel,
        target: Reactodia.ElementModel,
        options: { readonly signal?: AbortSignal; }
    ): Promise<Reactodia.MetadataCanModifyRelation> {
        await delay(SIMULATED_DELAY, options.signal);
        switch (link.linkTypeId) {
            case owl.domain:
            case owl.range:
            case rdfs.subClassOf:
            case rdfs.subPropertyOf: {
                return {
                    canChangeType: true,
                    canDelete: true,
                };
            }
            default: {
                return {};
            }
        }
    }

    async getEntityTypeShape(
        type: Reactodia.ElementTypeIri,
        options: { readonly signal?: AbortSignal; }
    ): Promise<Reactodia.MetadataEntityTypeShape> {
        await delay(SIMULATED_DELAY, options.signal);
        return {
            properties: [],
        };
    }

    async filterConstructibleTypes(
        types: ReadonlySet<Reactodia.ElementTypeIri>,
        options: { readonly signal?: AbortSignal }
    ): Promise<ReadonlySet<Reactodia.ElementTypeIri>> {
        await delay(SIMULATED_DELAY, options.signal);
        return new Set(Array.from(types).filter(type => this.editableTypes.has(type)));
    }
}

export class ExampleValidationProvider implements Reactodia.ValidationProvider {
    async validate(
        event: Reactodia.ValidationEvent
    ): Promise<Reactodia.ValidationResult> {
        const items: Array<Reactodia.ValidatedElement | Reactodia.ValidatedLink> = [];

        if (event.target.types.includes(owl.Class)) {
            event.state.links.forEach(e => {
                if (e.type === 'relationAdd' && e.data.sourceId === event.target.id) {
                    items.push({
                        type: 'link',
                        target: e.data,
                        severity: 'error',
                        message: 'Cannot add any new link from a Class',
                    });
                    items.push({
                        type: 'element',
                        target: event.target.id,
                        severity: 'warning',
                        message: `Cannot create <${e.data.linkTypeId}> link from a Class`,
                    });
                }
            });
        }

        if (event.target.types.includes(owl.ObjectProperty)) {
            if (!event.outboundLinks.some(link => link.linkTypeId === rdfs.subPropertyOf)) {
                items.push({
                    type: 'element',
                    target: event.target.id,
                    severity: 'info',
                    message: 'It might be a good idea to make the property a sub-property of another',
                });
            }
        }

        await delay(SIMULATED_DELAY, event.signal);
        return {items};
    }
}

async function delay(amountMs: number, ct: AbortSignal | undefined) {
    ct?.throwIfAborted();
    await waitTimeout(amountMs);
    ct?.throwIfAborted();
}

function waitTimeout(amountMs: number): Promise<void> {
    if (amountMs === 0) {
        return Promise.resolve();
    }
    return new Promise(resolve => setTimeout(resolve, amountMs));
}

type VocabularyKeyType<K extends string> =
    K extends Capitalize<K> ? Reactodia.ElementTypeIri : Reactodia.LinkTypeIri;
type Vocabulary<Keys extends string[]> = {
    readonly [K in Keys[number]]: VocabularyKeyType<K>;
};

function vocabulary<const Keys extends string[]>(prefix: string, keys: Keys): Vocabulary<Keys> {
    const result: { [key: string]: string } = Object.create(null);
    for (const key of keys) {
        result[key] = prefix + key;
    }
    return result as Vocabulary<Keys>;
}

function hasType(model: Reactodia.ElementModel | undefined, type: Reactodia.ElementTypeIri) {
    return Boolean(!model || model.types.find(t => t === type));
}