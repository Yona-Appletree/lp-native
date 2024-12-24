import { z } from 'zod';
import { EntityRoleKey } from '../data/entity-role-key';

/**
 * Uuid for an entity instance
 */
export const EntityInstanceUuid = z.string().brand('EntityInstanceUuid');

/**
 * Stored configuration for an entity.
 */
export interface EntityConfig {
  role: string;
  uuid: string;
  config: Record<string, unknown>;
  children: EntityConfig[];
}
export const EntityConfig: z.ZodType<EntityConfig> = z.object({
  role: EntityRoleKey,
  uuid: EntityInstanceUuid,
  config: z.record(z.unknown()),
  children: z.array(z.lazy(() => EntityConfig)),
});
