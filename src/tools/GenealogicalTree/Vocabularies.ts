import * as Reactodia from '@reactodia/workspace';

type VocabularyKeyType<K extends string> =
  K extends Capitalize<K>
    ? Reactodia.ElementIri & Reactodia.ElementTypeIri
    : Reactodia.LinkTypeIri & Reactodia.PropertyTypeIri;

type Vocabulary<Keys extends string[]> = { $namespace: string } & {
  readonly [K in Keys[number]]: VocabularyKeyType<K>;
};

export function vocabulary<const Keys extends string[]>(prefix: string, keys: Keys): Vocabulary<Keys> {
  const result: { [key: string]: string } = Object.create(null);
  for (const key of keys) {
    result[key] = prefix + key;
  }
  result.$namespace = prefix;
  return result as Vocabulary<Keys>;
}

// Based on https://github.com/blokhin/genealogical-trees/blob/master/data/header.ttl
export const genealogy = vocabulary('http://reactodia.github.io/genealogy#', [
  'ActiveSettings',
  'DataOrigin',
  'Marriage',
  'SchemaOrigin',
  'PackageSettings',
  'defaultLanguage',
  'defaultNamespaceBase',
  'hasGodparent',
  'hasPartner',
]);

export const rdfs = vocabulary(Reactodia.rdfs.$namespace, [
  'comment',
]);

export const schema = vocabulary(Reactodia.schema.$namespace, [
  'Female',
  'Male',
  'Person',
  'Place',
  'address',
  'birthDate',
  'birthPlace',
  'deathDate',
  'deathPlace',
  'endDate',
  'gender',
  'homeLocation',
  'latitude',
  'longitude',
  'parent',
  'relatedTo',
  'startDate',
]);

export const xsd = vocabulary(Reactodia.xsd.$namespace, [
  'boolean',
  'date',
  'dateTime',
  'decimal',
  'string',
]);
