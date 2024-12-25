import { ValueShapeDef } from '../value-shape-def';
import { z } from 'zod';

export const Int32Shape = ValueShapeDef({
  specifier: 'Int32',
  label: 'Int32',
  description: 'A 32-bit signed integer (-2^31 to 2^31-1).',
  schema: z.number(),
});
