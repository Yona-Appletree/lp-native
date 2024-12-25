import { ValueShapeDef } from '../value-shape-def';
import { z } from 'zod';

export const Vector2dShape = ValueShapeDef({
  specifier: 'Vector2',
  label: 'Vector2',
  description: 'A 2D vector of two scalar values.',
  schema: z.tuple([z.number(), z.number()]),
});
