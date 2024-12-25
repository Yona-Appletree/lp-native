import { z } from 'zod';
import { encodeBaseN } from '../../util/string/encode-base-n';

/**
 * Typed unique identifier with a brand identifying its type.
 *
 * Not called UUID to distinguish from standard UUID format.
 *
 * Example: `fixture:ab3eb115d1b4`
 */
export type TypedUid<TBrand extends string = string> = z.infer<
  ReturnType<typeof TypedUid<TBrand>>['schema']
>;

export function TypedUid<TBrand extends string>(brand: TBrand) {
  if (!brand.match(/^[a-z0-9\-]+$/)) {
    throw new Error('Uid brand does not match ^[a-z0-9]+$: ' + brand);
  }

  const schema = z
    .string()
    .refine(
      (it) => it.startsWith(brand + ':'),
      'Must start with the brand: ' + brand + ':'
    )
    .brand(brand);

  return Object.assign(() => generateUid(brand), { schema } as const);
}

export function generateUid<TBrand extends string>(brand: TBrand) {
  const now = Date.now();
  const randomPart = Math.floor(Math.random() * 2 ** 32);

  const array = new Uint8Array(12);
  const view = new DataView(array.buffer);

  // encode the 64 bits of now
  view.setUint32(0, now / 2 ** 32);
  view.setUint32(4, now % 2 ** 32);

  // encode the 32 bits of random
  view.setUint32(8, randomPart);

  const zz = encodeBaseN(array, '0123456789abcdefghijklmnopqrstuvwxyz');
  return brand + ':' + zz;
}
