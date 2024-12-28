import { z } from 'zod';
import { ValueShape } from '../value-shape/value-shape-def';

/**
 * Definition of a type of value source, a way of providing
 * a value to an input.
 */
export interface ValueSourceDef<
  TSourceKey extends ValueSourceKey = ValueSourceKey
> {
  key: TSourceKey;

  label: string;
  description: string;

  /**
   * Predicate that determines if a shape is compatible with this source.
   */
  shapePredicate: (shape: ValueShape) => boolean;
}

/**
 * An instance of a value source.
 */
export interface ValueSource<
  TValue = unknown,
  TParams = unknown,
  TSourceKey extends ValueSourceKey = ValueSourceKey
> {
  key: TSourceKey;
  label: string;
  params: TParams;
  schema: z.ZodType<TValue>;
}

/**
 * Create a shape definition for a value shape without parameters.
 */
export function ValueSourceDef<TSourceKey extends ValueSourceKey, TValue>(
  sourceDef: ValueSourceDef<TSourceKey>
) {
  return sourceDef;
}

/**
 * Key for a value shape.
 */
export type ValueSourceKey = z.infer<typeof ValueSourceKey>;
export const ValueSourceKey = z.enum(['literal', 'entity-query']);
