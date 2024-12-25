import { EntityRoleKey } from '../../entity-role/entity-role-key';
import { ConfigFieldDef } from './config-field-def';
import { EntityQuery, EntitySelector } from '../../data/entity-query';

export function entityQueryField<TKind extends EntityRoleKey>({
  label,
  description,
  role,
  defaultSelect = { $include: 'all' },
}: {
  label: string;
  description: string;
  role: TKind;
  defaultSelect?: EntitySelector;
}): ConfigFieldDef<EntityQuery<TKind>> {
  return {
    label,
    description,
    type: EntityQuery(role),
    defaultValue: {
      role: role,
      select: defaultSelect,
    },
  };
}
