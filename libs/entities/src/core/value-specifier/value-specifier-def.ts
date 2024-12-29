import { z } from 'zod';
import { ValueShape } from '../value-shape/value-shape-def';

/**
 * Definition of a type of value specifier, a way of providing
 * a value to an input.
 */
export interface ValueSpecifierDef<
  TSpecifierKey extends ValueSpecifierKey = ValueSpecifierKey
> {
  key: TSpecifierKey;

  label: string;
  description: string;

  /**
   * Predicate that determines if a shape is compatible with this specifier.
   */
  shapePredicate: (shape: ValueShape) => boolean;
}

/**
 * An instance of a value specifier.
 */
export interface ValueSpecifier<
  TValue = unknown,
  TParams = unknown,
  TSpecifierKey extends ValueSpecifierKey = ValueSpecifierKey
> {
  key: TSpecifierKey;
  label: string;
  params: TParams;
  schema: z.ZodType<TValue>;
}

/**
 * Create a shape definition for a value shape without parameters.
 */
export function ValueSpecifierDef<
  TSpecifierKey extends ValueSpecifierKey,
  TValue
>(specifierDef: ValueSpecifierDef<TSpecifierKey>) {
  return specifierDef;
}

/**
 * Key for a value shape.
 */
export type ValueSpecifierKey = z.infer<typeof ValueSpecifierKey>;
export const ValueSpecifierKey = z.enum(['literal', 'entity-query']);
