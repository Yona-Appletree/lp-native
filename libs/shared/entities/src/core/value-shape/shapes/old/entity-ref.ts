import { EntityInstanceUuid } from '../../../input/entity-config';
import { z } from 'zod';
import { EntityRoleKey } from '../../../entity-role/entity-role-key';

export const EntityRef = z.object({
  role: EntityRoleKey,
  uuid: EntityInstanceUuid,
});
