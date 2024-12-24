import { EntityInstanceUuid } from '../config/entity-config';
import { z } from 'zod';
import { EntityRoleKey } from './entity-role-key';

/**
 * A query for zero or more entities of a certain role.
 */
export function EntityQuery<TRole extends EntityRoleKey>(role: TRole) {
  return z.object({
    role: z.literal(role),
    select: EntitySelector,

    // todo: fix this unsafe cast
  }) as z.ZodType<EntityQuery<TRole>>;
}

export type EntityQuery<TRole extends EntityRoleKey> = {
  role: TRole;
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
