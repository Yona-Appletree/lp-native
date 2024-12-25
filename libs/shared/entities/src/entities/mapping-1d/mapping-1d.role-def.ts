import { z } from 'zod';
import { Vector1d } from '../../core/data/vector-1d';
import { zUint32Array } from '../../core/data/z-int32-array';

export const Mapping1dRoleDef = {
  key: 'mapping-1d',
  description:
    'Defines how the channels of a fixture are mapped into an 1d discrete space.',

  outputs: {
    mapping1d: {
      label: '1D mapping data',
      type: z.object({
        size: Vector1d,
        indexes: zUint32Array,
      }),
    },
  },

  messages: [],
};
