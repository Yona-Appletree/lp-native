import { z } from 'zod';

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
>(
  shape: ValueSpecifierDef<TSpecifierKey> & {
    schema: z.ZodType<TValue>;
  }
) {
  return ParametricSpecifierDef(
    {
      key: shape.key,
      label: shape.label,
      description: shape.description,
    },
    () => ({
      key: shape.key,
      label: shape.label,
      params: undefined,
      schema: shape.schema,
    })
  );
}

/**
 * Key for a value shape.
 */
export type ValueSpecifierKey = z.infer<typeof ValueSpecifierKey>;
export const ValueSpecifierKey = z.enum(['literal', 'entity-query']);
