import { ConfigFieldDef } from '../config/fields/config-field-def';
import { EntityRoleKey } from '../data/entity-role-key';

export interface EntityRoleDef {
  key: EntityRoleKey;
  label: string;
  config: Record<string, ConfigFieldDef>;
}

export type ConfigForEntity<T extends EntityRoleDef> = {
  [K in keyof T['config']]: T['config'][K]['defaultValue'];
};

export function entityMetadata<T extends EntityRoleDef>(metadata: T): T {
  return metadata;
}
