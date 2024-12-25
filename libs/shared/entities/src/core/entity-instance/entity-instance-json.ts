import { z } from 'zod';
import { EntityKindUid } from '../entity-kind/entity-kind-uid';

/**
 * Serialized form of an entity instance.
 */
export interface EntityInstanceJson {
  kindUid: EntityKindUid;
  instanceUid: string;
  config: Record<string, unknown>;
  children: EntityInstanceJson[];
}
export const EntityInstanceJson: z.ZodType<EntityInstanceJson> = z.object({
  kindUid: EntityKindUid,
  instanceUid: z.string(),
  config: z.record(z.unknown()),
  children: z.array(z.lazy(() => EntityInstanceJson)),
});
