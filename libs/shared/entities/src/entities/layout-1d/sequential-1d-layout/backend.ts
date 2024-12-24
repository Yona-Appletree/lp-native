import { entityBackend } from '../../../core/backend/entity-backend';
import metadata from './metadata';

export default entityBackend(metadata, async function ({ config, agent }) {
  return {
    dispose() {},
  };
});
