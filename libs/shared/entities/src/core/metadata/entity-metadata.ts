import { ConfigFieldDef } from '../config/fields/config-field-def';

export interface EntityMetadata {
  key: string;
  label: string;
  config: Record<string, ConfigFieldDef>;
}

export interface StringConfigItem {
  type: 'string';
  label: string;
  default: string;
}

export interface Int32ConfigItem {
  type: 'int32';
  label: string;
  default: number;
}

export type EntityConfigItem = StringConfigItem | Int32ConfigItem;

export type ConfigForEntity<T extends EntityMetadata> = {
  [K in keyof T['config']]: T['config'][K]['defaultValue'];
};

export function entityMetadata<T extends EntityMetadata>(metadata: T): T {
  return metadata;
}
