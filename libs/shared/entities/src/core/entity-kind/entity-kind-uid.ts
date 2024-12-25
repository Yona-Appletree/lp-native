import { TypedUid } from '../uid/typed-uid';
import { z } from 'zod';

/**
 * Unique Identifier for an entity kind.
 *
 * Entity kinds are identified by UID, not a key,
 * because runtime definition of entity kinds is allowed,
 * so they aren't known at compile time.
 */
export const EntityKindUid = TypedUid('entity-kind');
export type EntityKindUid = z.infer<(typeof EntityKindUid)['schema']>;
