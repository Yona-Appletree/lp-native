import { ValueShapeDef } from '../value-shape-def';
import { z } from 'zod';

export const Vector2dShape = ValueShapeDef({
  key: 'vector-2d',
  label: '2D Vector',
  description: 'A vector of two scalar values.',
  schema: z.tuple([z.number(), z.number()]),
});
