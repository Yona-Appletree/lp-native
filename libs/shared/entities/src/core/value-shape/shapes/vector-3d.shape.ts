import { ValueShapeDef } from '../value-shape-def';
import { z } from 'zod';

export const Vector3dShape = ValueShapeDef({
  specifier: 'Vector3',
  label: 'Vector3',
  description: 'A 3D vector of two scalar values.',
  schema: z.tuple([z.number(), z.number(), z.number()]),
});
