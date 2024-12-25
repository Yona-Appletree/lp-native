import { Vector1d } from './vector-1d';
import { z } from 'zod';
import { zUint32Array } from './z-int32-array';

export const Bitmask1d = z.object({
  size: Vector1d,
  bits: zUint32Array,
});
