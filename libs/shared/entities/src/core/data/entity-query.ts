import { EntityInstanceUuid } from '../config/entity-config';
import { z } from 'zod';
import { EntityKindKey } from './entity-kind-key';

/**
 * A query for zero or more entities of a certain kind.
 */
export function EntityQuery<TKind extends EntityKindKey>(kind: TKind) {
  return z.object({
    kind: z.literal(kind),
    select: EntitySelector,

    // todo: fix this unsafe cast
  }) as z.ZodType<EntityQuery<TKind>>;
}

export type EntityQuery<TKind extends EntityKindKey> = {
  kind: TKind;
  select: EntitySelector;
};

export type EntitySelector = z.infer<typeof EntitySelector>;
export const EntitySelector = z.discriminatedUnion('$include', [
  z.object({
    $include: z.literal('all'),
  }),
  z.object({
    $include: z.literal('uuids'),
    uuids: z.array(EntityInstanceUuid),
  }),
]);
