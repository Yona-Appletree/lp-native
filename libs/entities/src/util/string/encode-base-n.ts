/**
 * Encodes a byte array into a string using a custom base-N charset.
 *
 * First byte of the input array is the most significant byte.
 */
export function encodeBaseN(input: Uint8Array, charset: string): string {
  if (charset.length < 2) {
    throw new Error('Charset must contain at least 2 characters.');
  }

  const base = charset.length;
  let value = BigInt(0);

  // Convert the Uint8Array to a BigInt
  for (const byte of input) {
    value = (value << 8n) | BigInt(byte);
  }

  // Convert the BigInt to a base-N string
  let encoded = '';
  while (value > 0) {
    const remainder = value % BigInt(base);
    encoded = charset[Number(remainder)] + encoded;
    value = value / BigInt(base);
  }

  // Handle zero input
  return encoded || charset[0];
}
