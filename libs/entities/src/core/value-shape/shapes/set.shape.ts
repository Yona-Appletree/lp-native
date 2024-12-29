import { ParametricShapeDef, ValueShape } from '../value-shape-def';
import { z } from 'zod';

export default ParametricShapeDef(
  {
    key: 'set',
    label: 'Set',
    description: 'An ordered list of values, without duplicates.',
  },
  (itemShape: ValueShape) => ({
    key: 'set',
    label: `Set of ${itemShape.label}`,
    params: { itemShape },
    schema: z.array(itemShape.schema),
  })
);
