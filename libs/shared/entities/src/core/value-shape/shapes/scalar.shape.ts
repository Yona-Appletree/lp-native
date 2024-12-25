import { z } from 'zod';
import { ValueShapeDef } from '../value-shape-def';

export const ScalarShape = ValueShapeDef({
  specifier: 'scalar',
  label: 'Scalar value',
  description:
    'A scalar value, a unit-less decimal number, generally a floating point number, but exact representation is not guaranteed.',
  schema: z.number(),
});
