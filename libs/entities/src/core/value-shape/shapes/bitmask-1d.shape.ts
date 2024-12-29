import { z } from 'zod';

import { ValueShapeDef } from '../value-shape-def';
import { zUint8Array } from '../../../util/zod/z-uint8-array';

export default ValueShapeDef({
  key: 'bitmask-1d',
  label: '1D Bitmask',
  description: 'A 1 dimensional array of bits',
  schema: z.object({
    size: z.number(),
    bits: zUint8Array,
  }),
});
