import { EntityInstanceUuid } from '../config/entity-config';
import { z } from 'zod';
import { EntityRoleKey } from './entity-role-key';

export const EntityRef = z.object({
  role: EntityRoleKey,
  uuid: EntityInstanceUuid,
});
