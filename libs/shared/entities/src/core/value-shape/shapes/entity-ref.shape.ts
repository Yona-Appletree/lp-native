import { ParametricShapeDef } from '../value-shape-def';
import { z } from 'zod';
import { EntityRoleDef } from '../../entity-role/entity-role-def';

/**
 * Shape for an entity reference with a known role
 */
export default ParametricShapeDef(
  {
    key: 'entity-ref',
    label: 'Entity Reference',
    description: 'A reference to another entity with a known role.',
  },
  (role: EntityRoleDef) => ({
    key: 'entity-ref',
    label: `${role.label} Reference`,
    params: { roleKey: role.key },
    schema: z.array(
      // todo: enforce the entity reference to have the right prefix
      z.string()
    ),
  })
);
