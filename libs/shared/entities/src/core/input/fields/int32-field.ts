import { z } from 'zod';

export function int32Field({
  defaultValue = 0,
  ...field
}: {
  label: string;
  description: string;
  defaultValue?: number;
}) {
  return {
    ...field,
    type: z.number(),
    defaultValue: defaultValue,
  };
}
