import { ValueShapeDef } from '../value-shape-def';
import { z } from 'zod';

export const Vector3dShape = ValueShapeDef({
  key: 'vector-3d',
  label: '3D Vector',
  description: 'A vector of three scalar values.',
  schema: z.tuple([z.number(), z.number(), z.number()]),
});
