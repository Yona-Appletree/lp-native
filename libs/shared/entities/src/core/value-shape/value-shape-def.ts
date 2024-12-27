import { z } from 'zod';

/**
 * Definition of a value shape, a type node in a value tree.
 */
export interface ValueShapeDef<
  TShapeKey extends ValueShapeKey = ValueShapeKey
> {
  key: TShapeKey;

  label: string;
  description: string;
}

/**
 * A value shape node in a value tree.
 */
export interface ValueShape<
  TShapeKey extends ValueShapeKey = ValueShapeKey,
  TParams = unknown,
  TValue = unknown
> {
  key: TShapeKey;
  label: string;
  params: TParams;
  schema: z.ZodType<TValue>;
}

/**
 * Create a shape definition for a value shape without parameters.
 */
export function ValueShapeDef<TShapeKey extends ValueShapeKey, TValue>(
  shape: ValueShapeDef<TShapeKey> & {
    schema: z.ZodType<TValue>;
  }
) {
  return ParametricShapeDef(
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
 * Create a shape definition for a value shape with parameters.
 */
export function ParametricShapeDef<
  TShapeKey extends ValueShapeKey,
  TFactoryFn extends (...args: any[]) => ValueShape<TShapeKey>
>(shape: ValueShapeDef<TShapeKey>, factoryFn: TFactoryFn) {
  return Object.assign(factoryFn, shape);
}

/**
 * Key for a value shape.
 */
export type ValueShapeKey = z.infer<typeof ValueShapeKey>;
export const ValueShapeKey = z.enum([
  'int32',
  'list',
  'scalar',
  'string',
  'vector-2d',
  'vector-3d',
  'entity-ref',
]);
