import { ValueShape } from '../value-shape/value-shape-def';

export function EntityInputDef<T>(field: EntityInputDef<T>) {
  return field;
}

export type EntityInputDef<T = unknown> = {
  label: string;
  description: string;
  shape: ValueShape<T>;
  defaultValue: T;
};
