import { EntityRoleKey } from './entity-role-key';
import { ValueShape } from '../value-shape/value-shape-def';

/**
 * Definition of an entity role, or a "class" of entities.
 */
export interface EntityRoleDef {
  key: EntityRoleKey;

  label: string;
  description: string;

  outputs: Record<string, OutputDef>;
  messages: Record<string, MessageDef>;
}

export function EntityRoleDef(role: EntityRoleDef) {
  return role;
}

/**
 * Definition of an output from an entity.
 *
 * Outputs are value provided by an entity that can be used by other entities,
 * or by the user interface.
 *
 * Outputs can be "observed" by other entities, and when they are, the
 * generating entity will be asked to continuously update the output.
 */
export interface OutputDef<T = unknown> {
  label: string;
  description: string;
  shape: ValueShape<T>;
}

/**
 * Definition of a message that can be sent to an entity.
 *
 * Messages are a way to communicate with entities, to perform mutative
 * actions, or to request specific, one-time value.
 *
 * Data that doesn't need parameters should be exposed as an output instead.
 */
export interface MessageDef<TIn = unknown, TOut = unknown> {
  label: string;
  description: string;

  inputType: ValueShape<TIn>;
  outputType: ValueShape<TOut>;
}
