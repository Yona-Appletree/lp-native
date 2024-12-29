import { EntityInputDef } from '../input/entity-input-def';
import { EntityRoleKey } from '../entity-role/entity-role-key';
import { EntityKindUid } from './entity-kind-uid';

export interface EntityKindDef {
  role: EntityRoleKey;
  uid: EntityKindUid;
  label: string;
  description: string;
  inputs: Record<string, EntityInputDef>;
}

export type InputForEntity<T extends EntityKindDef> = {
  [K in keyof T['inputs']]: T['inputs'][K]['defaultValue'];
};

export function EntityKindDef(kind: EntityKindDef) {
  return kind;
}
