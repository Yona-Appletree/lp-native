import { ValueShapeDef } from '../value-shape-def';
import { z } from 'zod';

export const StringShape = ValueShapeDef({
  specifier: 'string',
  label: 'String',
  description: 'Text data.',
  schema: z.string(),
});
