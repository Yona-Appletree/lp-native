import { ConfigFieldDef } from '../config/fields/config-field-def';
import { EntityRoleKey } from '../entity-role/entity-role-key';
import { TypedUid } from '../uids/typed-uid';

export interface EntityKindDef {
  key: EntityRoleKey;
  label: string;
  description: string;
  config: Record<string, ConfigFieldDef>;
  uidType: TypedUid;
}

export type ConfigForEntity<T extends EntityKindDef> = {
  [K in keyof T['config']]: T['config'][K]['defaultValue'];
};
