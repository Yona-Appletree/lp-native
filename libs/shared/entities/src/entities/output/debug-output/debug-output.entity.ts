import {
  ConfigForEntity,
  EntityMetadata,
} from '../../../core/metadata/entity-metadata';

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
} satisfies EntityMetadata;

export type DebugOutputConfig = ConfigForEntity<typeof DebugOutputEntity>;

export default DebugOutputEntity;
