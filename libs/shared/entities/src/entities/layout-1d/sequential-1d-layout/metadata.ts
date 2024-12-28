import { EntityKindDef } from '../../../core/entity-kind/entity-kind-def';
import { EntityKindUid } from '../../../core/entity-kind/entity-kind-uid';
import SetShape from '../../../core/value-shape/shapes/set.shape';
import EntityRef from '../../../core/value-shape/shapes/entity-ref.shape';
import { Mapping1dRoleDef } from '../../mapping-1d/mapping-1d.role-def';

export default EntityKindDef({
  role: 'layout-1d',
  uid: EntityKindUid('core:layout-1d:sequential'),
  label: 'Sequential 1D layout',
  description:
    'A 1D layout where the fixtures are placed sequentially, and not overlapping.',
  inputs: {
    mappings: {
      label: 'Mappings',
      description: 'The fixture mappings to include in the layout.',
      shape: SetShape(EntityRef(Mapping1dRoleDef)),
      defaultValue: [],
    },
  },
});
