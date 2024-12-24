import { z } from 'zod';

export type Vector1d = z.infer<typeof Vector1d>;
export const Vector1d = z.object({
  x: z.number(),
});
