import { EntityAgent } from './entity-agent';
import { ConfigForEntity, EntityRoleDef } from '../entity-role/entity-role-def';

export function entityBackend<TDef extends EntityRoleDef>(
  definition: TDef,
  factory: EntityBackendDef<TDef>['factory']
): EntityBackendDef<TDef> {
  return {
    definition,
    factory,
  };
}

export interface EntityBackendDef<TDef extends EntityRoleDef> {
  definition: TDef;
  factory: (params: {
    config: ConfigForEntity<TDef>;
    agent: EntityAgent;
  }) => Promise<{
    dispose: () => void | Promise<void>;
  }>;
}
