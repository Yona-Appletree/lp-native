import { z } from 'zod';

/**
 * Definition of a value shape, the basic units of data in the system.
 */
export interface ValueShapeDef<T = unknown> {
  specifier: ValueShapeSpecifier;

  label: string;
  description: string;

  schema: z.ZodType<T>;
}

export function ValueShapeDef<T>(
  role: Omit<ValueShapeDef<T>, 'specifier'> & {
    specifier: string;
  }
): ValueShapeDef<T> {
  return {
    ...role,
    specifier: role.specifier as ValueShapeSpecifier,
  };
}

/**
 * A json representation of a value shape.
 */
export type ValueShapeSpecifier = z.infer<typeof ValueShapeSpecifier>;
export const ValueShapeSpecifier = z.string().brand('ValueShapeSpecifier');
