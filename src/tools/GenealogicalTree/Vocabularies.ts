import * as Reactodia from '@reactodia/workspace';

type VocabularyKeyType<K extends string> =
  K extends Capitalize<K>
    ? Reactodia.ElementTypeIri
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
export const fhkb = vocabulary('http://www.example.com/genealogy.owl#', [
  'Female',
  'Male',
  'Marriage',
  'Person',
  'hasGodparent',
  'hasPartner',
  'hasParent',
  'hasSex',
]);

export const rdfs = vocabulary('http://www.w3.org/2000/01/rdf-schema#', [
  'comment',
]);

export const schema = vocabulary(Reactodia.schema.$namespace, [
  'Place',
  'address',
  'birthDate',
  'birthPlace',
  'deathDate',
  'deathPlace',
  'encodingFormat',
  'endDate',
  'fileSize',
  'homeLocation',
  'latitude',
  'longitude',
  'relatedTo',
  'startDate',
  'uploadDate',
]);

export const xsd = vocabulary('http://www.w3.org/2001/XMLSchema', [
  'date',
  'dateTime',
  'decimal',
]);

export const genealogy = vocabulary('http://reactodia.github.io/genealogy/', [
  'DataOrigin',
  'SchemaOrigin',
]);
