import { ValueShapeDef } from '../value-shape-def';
import { z } from 'zod';

export function ListShape<T>(itemShape: ValueShapeDef<T>) {
  return ValueShapeDef({
    specifier: `List<${itemShape.specifier}>`,
    label: `List(${itemShape.label})`,
    description: `A list of ${itemShape.description}`,
    schema: z.array(itemShape.schema),
  });
}
