import { z } from 'zod';

export function ConfigFieldDef<T>(field: ConfigFieldDef<T>) {
  return field;
}

export type ConfigFieldDef<T = unknown> = {
  label: string;
  description: string;
  type: z.ZodType<T>;
  defaultValue: T;
};
