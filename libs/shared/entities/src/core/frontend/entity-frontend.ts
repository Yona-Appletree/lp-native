import { ConfigForEntity, EntityMetadata } from '../metadata/entity-metadata';
import { EntityAgent } from '../backend/entity-agent';

export function entityFrontend<TDef extends EntityMetadata>(
  definition: TDef,
  factory: EntityFrontendDef<TDef>['factory']
): EntityFrontendDef<TDef> {
  return {
    definition,
    factory,
  };
}

export interface EntityFrontendDef<TDef extends EntityMetadata> {
  definition: TDef;
  factory: (params: {
    config: ConfigForEntity<TDef>;
    agent: EntityAgent;
  }) => Promise<{
    dispose: () => void | Promise<void>;
  }>;
}
