import { ValueSpecifierDef } from '../value-specifier-def';

export default ValueSpecifierDef({
  key: 'literal',
  label: 'Literal Value',
  description: 'A literal value.',
  shapePredicate: () => true,
});
