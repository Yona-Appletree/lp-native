import { EntityInstanceUuid } from '../config/entity-config';
import { z } from 'zod';
import { EntityKindKey } from './entity-kind-key';

export const EntityRef = z.object({
  kind: EntityKindKey,
  uuid: EntityInstanceUuid,
});
