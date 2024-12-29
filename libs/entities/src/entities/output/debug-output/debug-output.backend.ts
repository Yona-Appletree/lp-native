import { entityBackend } from '../../../core/backend/entity-backend';
import DebugOutputEntity from './debug-output.entity';

export default entityBackend(
  DebugOutputEntity,
  async function ({ config, agent }) {
    return {
      dispose() {},
    };
  }
);
