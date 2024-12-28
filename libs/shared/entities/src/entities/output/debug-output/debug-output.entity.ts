import {
  EntityKindDef,
  InputForEntity,
} from '../../../core/entity-kind/entity-kind-def';

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
} satisfies EntityKindDef;

export type DebugOutputConfig = InputForEntity<typeof DebugOutputEntity>;

export default DebugOutputEntity;
