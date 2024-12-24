import { z } from 'zod';
import { EntityKindKey } from '../data/entity-kind-key';

/**
 * Uuid for an entity instance
 */
export const EntityInstanceUuid = z.string().brand('EntityInstanceUuid');

/**
 * Stored configuration for an entity.
 */
export interface EntityConfig {
  kind: string;
  uuid: string;
  config: Record<string, unknown>;
  children: EntityConfig[];
}
export const EntityConfig: z.ZodType<EntityConfig> = z.object({
  kind: EntityKindKey,
  uuid: EntityInstanceUuid,
  config: z.record(z.unknown()),
  children: z.array(z.lazy(() => EntityConfig)),
});
