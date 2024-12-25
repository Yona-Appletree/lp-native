import { EntityInputDef } from '../input/fields/entity-input-def';
import { EntityRoleKey } from '../entity-role/entity-role-key';
import { TypedUid } from '../uids/typed-uid';

export interface EntityKindDef {
  key: EntityRoleKey;
  label: string;
  description: string;
  inputs: Record<string, EntityInputDef>;
  uidType: TypedUid;
}

export type ConfigForEntity<T extends EntityKindDef> = {
  [K in keyof T['config']]: T['config'][K]['defaultValue'];
};
