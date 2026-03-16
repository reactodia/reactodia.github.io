import * as Reactodia from '@reactodia/workspace';

import { getSinglePropertyValue } from './OwlShaclSchema';
import { fhkb } from './Vocabularies';

export class GenealogicalValidationProvider implements Reactodia.ValidationProvider {
  private dataProvider = new Reactodia.EmptyDataProvider();

  async validate(e: Reactodia.ValidationEvent): Promise<Reactodia.ValidationResult> {
    const {target, state, translation: t, signal} = e;
    const validations: (Reactodia.ValidatedElement | Reactodia.ValidatedLink)[] = [];
    if (target.types.includes(fhkb.Marriage)) {
      const items = await this.dataProvider.lookup({refElementId: target.id, linkDirection: 'out', signal});
      const partners = new Set<Reactodia.ElementIri>();
      for (const item of items) {
        if (item.outLinks.has(fhkb.hasPartner)) {
          partners.add(item.element.id);
        }
      }
      for (const {type, data} of state.links.values()) {
        if (data.sourceId === target.id && data.linkTypeId === fhkb.hasPartner) {
          if (type === 'relationAdd') {
            partners.add(data.targetId);
          } else if (type === 'relationDelete') {
            partners.delete(data.targetId);
          }
        }
      }
      if (partners.size < 2) {
        validations.push({
          type: 'element',
          target: target.id,
          severity: 'warning',
          message: t.text('genealogical_tree.validation.marriage_partner_count'),
        });
      }
    } else if (target.types.includes(fhkb.Person)) {
      const event = state.elements.get(target.id);
      if (!event || event.type !== 'entityDelete') {
        const data = event?.data ?? target;
        const sex = getSinglePropertyValue(data, fhkb.hasSex);
        if (!sex) {
          validations.push({
            type: 'element',
            target: target.id,
            severity: 'warning',
            propertyType: fhkb.hasSex,
            message: t.text('genealogical_tree.validation.missing_property_value'),
          });
        }
      }
    }
    return {items: validations};
  }

  setProvider(dataProvider: Reactodia.DataProvider): void {
    this.dataProvider = dataProvider;
  }
}
