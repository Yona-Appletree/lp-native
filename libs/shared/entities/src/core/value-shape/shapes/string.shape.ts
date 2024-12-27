import { ValueShapeDef } from '../value-shape-def';
import { z } from 'zod';

export const StringShape = ValueShapeDef({
  key: 'string',
  label: 'String',
  description: 'Text data.',
  schema: z.string(),
});
