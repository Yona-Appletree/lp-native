import { EntityRoleKey } from '../../data/entity-role-key';
import { ConfigFieldDef } from './config-field-def';
import { EntityQuery, EntitySelector } from '../../data/entity-query';

export function entityQueryField<TKind extends EntityRoleKey>({
  label,
  description,
  kind,
  defaultSelect = { $include: 'all' },
}: {
  label: string;
  description: string;
  kind: TKind;
  defaultSelect?: EntitySelector;
}): ConfigFieldDef<EntityQuery<TKind>> {
  return {
    label,
    description,
    type: EntityQuery(kind),
    defaultValue: {
      kind: kind,
      select: defaultSelect,
    },
  };
}
