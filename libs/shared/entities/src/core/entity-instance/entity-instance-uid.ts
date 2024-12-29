import { TypedUid } from '../uid/typed-uid';
import { z } from 'zod';

/**
 * Unique Identifier for an entity kind.
 *
 * Entity kinds are identified by UID, not a key,
 * because runtime definition of entity kinds is allowed,
 * so they aren't known at compile time.
 */
export const EntityInstanceUid = TypedUid('entity-instance');
export type EntityInstanceUid = z.infer<(typeof EntityInstanceUid)['schema']>;
