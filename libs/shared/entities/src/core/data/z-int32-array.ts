import { z } from 'zod';

export const zUint32Array = z.custom<Uint32Array>(
  (data) => data instanceof Uint32Array
);
