import {
  ConfigForEntity,
  EntityRoleDef,
} from '../../../core/entity-role/entity-role-def';

export const DebugOutputEntity = {
  key: 'debug-output',
  label: 'Debug output',
  config: {
    count: {
      type: 'int32',
      label: 'Channel count',
      default: 100,
    },
  },
} satisfies EntityRoleDef;

export type DebugOutputConfig = ConfigForEntity<typeof DebugOutputEntity>;

export default DebugOutputEntity;
