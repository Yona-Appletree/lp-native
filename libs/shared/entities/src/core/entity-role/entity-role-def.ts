import { EntityRoleKey } from './entity-role-key';

/**
 * Definition of an entity role, or a "class" of entities.
 */
export interface EntityRoleDef {
  key: EntityRoleKey;
  label: string;
  description: string;
}
