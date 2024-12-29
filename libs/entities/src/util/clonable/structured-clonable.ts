/**
 * A type that represents a value that can be cloned using the
 * structured cloning algorithm.
 */
export type StructuredClonable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | RegExp
  | ArrayBuffer
  | Blob
  | File
  | ImageBitmap
  | Map<StructuredClonable, StructuredClonable>
  | Set<StructuredClonable>
  | StructuredClonable[] // Recursive: Arrays of clonable types
  | { [key: string]: StructuredClonable }; // Objects with clonable values
