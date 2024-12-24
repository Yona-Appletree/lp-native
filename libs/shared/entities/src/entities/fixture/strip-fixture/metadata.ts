import { entityQueryField } from '../../../core/config/fields/entity-query-field';

export default {
  key: 'strip-fixture',
  label: 'LED Strip',
  description: 'An LED strip or similar 1-dimensional array of lights',
  config: {
    mappings: entityQueryField({
      label: 'Mappings',
      description: 'The fixture mappings to include in the layout.',
      kind: 'mapping',
    }),
  },
};
