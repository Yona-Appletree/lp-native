import { EntityAgent } from './entity-agent';
import { ConfigForEntity, EntityMetadata } from '../metadata/entity-metadata';

export function entityBackend<TDef extends EntityMetadata>(
  definition: TDef,
  factory: EntityBackendDef<TDef>['factory']
): EntityBackendDef<TDef> {
  return {
    definition,
    factory,
  };
}

export interface EntityBackendDef<TDef extends EntityMetadata> {
  definition: TDef;
  factory: (params: {
    config: ConfigForEntity<TDef>;
    agent: EntityAgent;
  }) => Promise<{
    dispose: () => void | Promise<void>;
  }>;
}
