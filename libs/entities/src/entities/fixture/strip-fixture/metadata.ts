import { EntityKindDef } from '../../../core/entity-kind/entity-kind-def';
import EntityRef from '../../../core/value-shape/shapes/entity-ref.shape';
import { int32Input } from '../../../core/input/helpers/int32-input';
import { EntityKindUid } from '../../../core/entity-kind/entity-kind-uid';
import { OutputRole } from '../../output/output.role';

export const StripFixture = EntityKindDef({
  role: 'output',
  uid: EntityKindUid('core:strip-fixture'),
  label: 'LED Strip',
  description: 'An LED strip or similar 1-dimensional array of lights',
  inputs: {
    length: int32Input({
      label: 'Length',
      description: 'The number of lights in the strip',
      defaultValue: 64,
    }),
    // todo: add color order
    output: {
      label: 'Output',
      description: 'The output to which the strip is connected',
      shape: EntityRef(OutputRole),
      defaultValue: '',
    },
  },
});
