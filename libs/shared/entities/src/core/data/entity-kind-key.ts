import { z } from 'zod';

/**
 * Key for an entity type
 */
export type EntityKindKey = z.infer<typeof EntityKindKey>;
export const EntityKindKey = z.enum([
  'fixture',
  'group',
  'image',
  'layout',
  'mapping',
  'output',
]);
