import { entityQueryField } from '../../../core/config/fields/entity-query-field';
import { z } from 'zod';

export default {
  key: 'sequential-1d-layout',
  label: 'Sequential 1D layout',
  description:
    'A 1D layout where the fixtures are placed sequentially, and not overlapping.',
  config: {
    mappings: entityQueryField({
      label: 'Mappings',
      description: 'The fixture mappings to include in the layout.',
      kind: 'mapping',
    }),

    ordering: {
      label: 'Ordering',
      description: 'The ordering of the fixtures',
      type: z.array(z.string()),
      defaultValue: [],
    },
  },
};
