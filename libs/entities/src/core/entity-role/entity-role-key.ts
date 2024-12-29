import { z } from 'zod';

/**
 * Key for an entity role
 */
export type EntityRoleKey = z.infer<typeof EntityRoleKey>;
export const EntityRoleKey = z.enum([
  'fixture',
  'group',
  'image',
  'output',

  'mapping-1d',
  'layout-1d',
]);
