import { EntityRoleDef } from '../../core/entity-role/entity-role-def';
import ListShape from '../../core/value-shape/shapes/list.shape';
import Bitmask1dShape from '../../core/value-shape/shapes/bitmask-1d.shape';

export const Mapping1dRole = EntityRoleDef({
  key: 'mapping-1d',
  label: '1D Mapping',
  description:
    'Defines how the channels of a fixture are mapped into a 1d discrete space.',

  outputs: {
    mapping1d: {
      label: '1D mapping value',
      description: 'The value of the 1D mapping at the given index.',
      shape: ListShape(Bitmask1dShape()),
    },
  },

  messages: {},
});
