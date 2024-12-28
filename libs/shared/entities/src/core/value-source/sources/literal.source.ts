import { ValueSourceDef } from '../value-source-def';

export default ValueSourceDef({
  key: 'literal',
  label: 'Literal Value',
  description: 'A literal value.',
  shapePredicate: () => true,
});
