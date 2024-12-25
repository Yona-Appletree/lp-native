import { z } from 'zod';
import { Vector1d } from '../../core/value-shape/shapes/old/vector-1d';
import { zUint32Array } from '../../core/value-shape/shapes/old/z-int32-array';

export const Mapping1dRoleDef = {
  key: 'mapping-1d',
  description:
    'Defines how the channels of a fixture are mapped into an 1d discrete space.',

  outputs: {
    mapping1d: {
      label: '1D mapping value',
      type: z.object({
        size: Vector1d,
        indexes: zUint32Array,
      }),
    },
  },

  messages: [],
};
