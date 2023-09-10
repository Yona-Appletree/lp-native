export interface ModuleParam {
    name: string
    description: string
    typeInfo: ModuleParamTypeInfo
}

export interface BaseModuleParamTypeInfo {
    "@type": string;
}

export interface RangeFloatParamInfo extends BaseModuleParamTypeInfo {
    "@type": "range";
    minInclusive?: number;
    maxInclusive?: number;
    roundTo?: number;
}

export interface NumericParamInfo extends BaseModuleParamTypeInfo {
    "@type": "numeric";
    minInclusive?: number;
    maxInclusive?: number;
    roundTo?: number;
    stepValue?: number;
}

export type ModuleParamTypeInfo = RangeFloatParamInfo | NumericParamInfo;