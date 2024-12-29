import { z } from 'zod';

export const zUint8Array = z.custom<Uint8Array>(
  (data) => data instanceof Uint8Array
);
