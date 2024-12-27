import { ParametricShapeDef, ValueShape } from '../value-shape-def';
import { z } from 'zod';

export default ParametricShapeDef(
  {
    key: 'list',
    label: 'List',
    description: 'An ordered list of values.',
  },
  (itemShape: ValueShape) => ({
    key: 'list',
    label: `List of ${itemShape.label}`,
    params: { itemShape },
    schema: z.array(itemShape.schema),
  })
);
