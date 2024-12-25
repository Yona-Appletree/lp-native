import { ConfigForEntity, EntityKindDef } from '../entity-kind/entity-kind-def';
import { EntityAgent } from '../backend/entity-agent';

export function entityFrontend<TDef extends EntityKindDef>(
  definition: TDef,
  factory: EntityFrontendDef<TDef>['factory']
): EntityFrontendDef<TDef> {
  return {
    definition,
    factory,
  };
}

export interface EntityFrontendDef<TDef extends EntityKindDef> {
  definition: TDef;
  factory: (params: {
    config: ConfigForEntity<TDef>;
    agent: EntityAgent;
  }) => Promise<{
    dispose: () => void | Promise<void>;
  }>;
}
