import { z } from 'zod';

export const ColorspaceKey = z.enum(['oklab', 'oklch', 'rgb', 'srgb']);
export type ColorspaceKey = z.infer<typeof ColorspaceKey>;
