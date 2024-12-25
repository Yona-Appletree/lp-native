import { describe } from 'vitest';
import { encodeBaseN } from './encode-base-n';

describe('encodeBaseN', () => {
  it('base 2-16', () => {
    for (let base = 2; base <= 16; base++) {
      for (let i = 0; i < 100_000_000; i += 1 + i * 3.5) {
        const value = Math.floor(i);
        const array = new Uint8Array([
          (value >> 24) & 0xff,
          (value >> 16) & 0xff,
          (value >> 8) & 0xff,
          value & 0xff,
        ]);

        expect(encodeBaseN(array, '0123456789abcdef'.slice(0, base))).toEqual(
          value.toString(base)
        );
      }
    }
  });
});
