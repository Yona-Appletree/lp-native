import { EntityRoleDef } from '../../core/entity-role/entity-role-def';

export const OutputRole = EntityRoleDef({
  key: 'output',
  label: 'Output',
  description: 'Sends data to devices or other systems.',
  outputs: {},
  messages: {},
});
