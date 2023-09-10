import {ModuleParam} from "./ModuleParam";
import {PlatformDefinition, PlatformSlug} from "./PlatformDefinition";

export interface ModuleDefinition extends Record<string, unknown> {
    paramGroups: ModuleParamGroup[]
    platforms: PlatformSlug[]
    interopFunctions: NativeFunctionDefinition[]
    nativeFunctions: NativeFunctionDefinition[]
}

export interface ModuleParamGroup {
    name?: string
    description?: string
    params: ModuleParam[]
}

export interface NativeFunctionDefinition {
    name: string
    returnType: PrimitiveTypeSlug
    parameters: ParameterDefinition[]
}

export interface ParameterDefinition {
    name: string
    type: PrimitiveTypeSlug
}

export type PrimitiveTypeSlug = "int32" | "float64" | "string" | "boolean";

export function cppTypeForPrimitiveType(type: PrimitiveTypeSlug): string {
    // Use  stdint.h types
    switch (type) {
        case "int32": return "int32_t";
        case "float64": return "float64_t";
        case "string": return "const char *";
        case "boolean": return "bool";
    }
}