import { z } from 'zod';

export function EntityInputDef<T>(field: EntityInputDef<T>) {
  return field;
}

export type EntityInputDef<T = unknown> = {
  label: string;
  description: string;
  type: z.ZodType<T>;
  defaultValue: T;
};
