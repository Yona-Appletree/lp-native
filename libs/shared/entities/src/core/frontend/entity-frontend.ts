import { ConfigForEntity, EntityRoleDef } from '../entity-role/entity-role-def';
import { EntityAgent } from '../backend/entity-agent';

export function entityFrontend<TDef extends EntityRoleDef>(
  definition: TDef,
  factory: EntityFrontendDef<TDef>['factory']
): EntityFrontendDef<TDef> {
  return {
    definition,
    factory,
  };
}

export interface EntityFrontendDef<TDef extends EntityRoleDef> {
  definition: TDef;
  factory: (params: {
    config: ConfigForEntity<TDef>;
    agent: EntityAgent;
  }) => Promise<{
    dispose: () => void | Promise<void>;
  }>;
}
