import { z } from 'zod';
import { EntityKindUid } from '../entity-kind/entity-kind-uid';

export type EntityInputAssignment = z.infer<typeof EntityInputAssignment>;
export const EntityInputAssignment = z.discriminatedUnion('$type', [
  z.object({
    $type: z.literal('literal'),
    value: z.unknown(),
  }),
  z.object({
    $type: z.literal('entity-uid-output'),
    entityUid: z.string(),
    outputKey: z.string(),
  }),
]);

/**
 * Serialized form of an entity instance.
 */
export interface EntityInstanceJson {
  kindUid: EntityKindUid;
  instanceUid: string;
  inputs: Record<string, EntityInputAssignment>;
  children: EntityInstanceJson[];
}
export const EntityInstanceJson: z.ZodType<EntityInstanceJson> = z.object({
  kindUid: EntityKindUid,
  instanceUid: z.string(),
  inputs: z.record(EntityInputAssignment),
  children: z.array(z.lazy(() => EntityInstanceJson)),
});
