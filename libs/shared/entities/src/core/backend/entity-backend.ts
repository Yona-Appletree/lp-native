import { EntityAgent } from './entity-agent';
import { ConfigForEntity, EntityKindDef } from '../entity-kind/entity-kind-def';

export function entityBackend<TDef extends EntityKindDef>(
  definition: TDef,
  factory: EntityBackendDef<TDef>['factory']
): EntityBackendDef<TDef> {
  return {
    definition,
    factory,
  };
}

export interface EntityBackendDef<TDef extends EntityKindDef> {
  definition: TDef;
  factory: (params: {
    config: ConfigForEntity<TDef>;
    agent: EntityAgent;
  }) => Promise<{
    dispose: () => void | Promise<void>;
  }>;
}
