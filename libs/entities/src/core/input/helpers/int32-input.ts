import { EntityInputDef } from '../entity-input-def';
import Int32Shape from '../../value-shape/shapes/int32.shape';

export function int32Input(def: {
  label: string;
  description: string;
  defaultValue: number;
}) {
  return {
    label: def.label,
    description: def.description,
    defaultValue: def.defaultValue,
    shape: Int32Shape(),
  } satisfies EntityInputDef<number>;
}
