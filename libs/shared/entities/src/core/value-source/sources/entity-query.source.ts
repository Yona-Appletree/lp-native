import { ValueSourceDef } from '../value-source-def';
import SetShape from '../../value-shape/shapes/set.shape';
import EntityRefShape from '../../value-shape/shapes/entity-ref.shape';

export default ValueSourceDef({
  key: 'entity-query',
  label: 'Entity Query',
  description: 'Provides a set of entity references based on criteria.',

  shapePredicate: (shape) =>
    SetShape.isInstance(shape) &&
    EntityRefShape.isInstance(shape.params.itemShape),
});
