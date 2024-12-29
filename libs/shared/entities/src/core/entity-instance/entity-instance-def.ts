import { EntityKindUid } from '../entity-kind/entity-kind-uid';
import { ValueSpecifier } from '../value-specifier/value-specifier-def';
import { EntityInstanceUid } from './entity-instance-uid';

export interface EntityInstanceDef {
  uid: EntityInstanceUid;
  kindUid: EntityKindUid;

  label: string;
  description: string;

  inputs: Record<string, ValueSpecifier>;
  children: EntityInstanceDef[];
}

export function EntityInstanceDef(def: EntityInstanceDef) {
  return def;
}
