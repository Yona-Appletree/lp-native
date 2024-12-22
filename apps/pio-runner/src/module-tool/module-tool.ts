import * as fs from 'fs'
import * as path from 'path'
import * as child_process from 'child_process'

import {
    cppTypeForPrimitiveType,
    ModuleDefinition,
    NativeFunctionDefinition,
    tsTypeForPrimitiveType
} from "./ModuleDefinition";
import {Platforms} from "./PlatformDefinition";
import {trimMargin} from "./util/trimMargin";
import {titleCase} from "./util/caseUtil";
import {renameFilePrefixesInDirRecursively} from "./util/rename-file-prefixes-in-dir-recursively";

async function main() {
    const modulesDir = path.normalize(path.join(path.dirname(process.argv[1]), "../modules"));

    // update all modules
    fs.readdirSync(modulesDir)
        .filter(filename => fs.statSync(path.join(modulesDir, filename)).isDirectory())
        .forEach(moduleName => updateModule(modulesDir, moduleName));
}

async function updateModule(
    modulesDir: string,
    moduleName: string,
) {
    // Check if module directory exists
    const moduleDir = path.join(modulesDir, moduleName);

    if (!fs.existsSync(moduleDir)) {
        console.error(`Module directory ${moduleName} does not exist at ${moduleDir}`);
        return;
    }

    // Find module definition file

    const existingDefFilename = fs.readdirSync(moduleDir).find(filename => filename.endsWith(".module.ts"));
    const existingModuleName = existingDefFilename?.replace(/\.module\.ts$/, "");

    // Rename files if module name has changed
    if (existingModuleName && existingModuleName !== moduleName) {
        renameFilePrefixesInDirRecursively(moduleDir, existingModuleName, moduleName);
    }

    // Check if module definition file exists
    const moduleDefFilename = `${moduleName}.module.ts`;
    const moduleDefPath = path.join(moduleDir, moduleDefFilename);

    if (!fs.existsSync(moduleDefPath)) {
        console.error(`Module definition file ${moduleDefFilename} does not exist at ${moduleDefPath}`);
        return;
    }

    // Load module definition
    const moduleDef = (await import(moduleDefPath)).default as ModuleDefinition;

    // Create impl directory if it doesn't exist
    const moduleImplDir = path.join(moduleDir, "impl");
    if (!fs.existsSync(moduleImplDir)) {
        fs.mkdirSync(moduleImplDir);
    }

    console.log(`Updating module "${moduleDef.name}" at ${moduleDir}...`);

    function ensureFile(
        {
            filename,
            contents,
            overwrite,
            runPrettier
        }: { filename: string, contents: string, overwrite: boolean, runPrettier: boolean },
    ) {
        const filePath = path.join(moduleImplDir, filename);

        if (!fs.existsSync(filePath) || overwrite) {
            fs.writeFileSync(filePath, contents);
            console.log(`Created file ${filename}`);
        }

        if (runPrettier) {
            child_process.spawnSync("npx", ["prettier", "--write", filePath]);
        }
    }

    function cppForFunc(
        def: NativeFunctionDefinition,
        kind: "definition" | "declaration"
    ): string {
        const declaration = `${cppTypeForPrimitiveType(def.returnType)} ${def.name}(\n` +
            def.parameters.map(param => `\t${cppTypeForPrimitiveType(param.type)} ${param.name}`).join(",\n") +
            "\n)";

        switch (kind) {
            case "declaration":
                return declaration + ";\n";
            case "definition":
                return declaration + " {\n\n}\n";
        }
    }

    function ensureTsFiles(
        baseFilename: string,
        functions: NativeFunctionDefinition[],
    ) {
        const interfaceName = titleCase(moduleName) + titleCase(baseFilename);
        const implName = interfaceName + "Impl";

        ensureFile({
            filename: `${baseFilename}.declaration.ts`,
            contents: trimMargin(
                `export interface ${interfaceName} {` +
                functions.map(def => `    ${def.name}: (` + def.parameters.map(param => `${param.name}: ${tsTypeForPrimitiveType(param.type)}`).join(", ") + `) => ${tsTypeForPrimitiveType(def.returnType)}\n`).join("\n") +
                `}`
            ),
            overwrite: true,
            runPrettier: true
        });

        ensureFile({
            filename: `${baseFilename}.ts`,
            contents:
                `import {${interfaceName}} from "./${baseFilename}.declaration";` +
                `export default class ${implName} implements ${interfaceName} {` +
                functions.map(def => `    ${def.name}(${def.parameters.map(param => `${param.name}: ${tsTypeForPrimitiveType(param.type)}`).join(", ")}): ${tsTypeForPrimitiveType(def.returnType)} {\n\n}`).join("\n") +
                `}`
            ,
            overwrite: false,
            runPrettier: true
        })
    }

    function ensureCFiles(
        baseFilename: string,
        functions: NativeFunctionDefinition[],
    ) {
        if (functions.length === 0) return;

        const headerVarName = `${baseFilename.replace(/[^a-z0-9]+/ig, "_").toUpperCase()}_H`;
        ensureFile(
            {
                filename: `${baseFilename}.h`,
                contents: "#ifndef " + headerVarName + "\n" +
                    "#define " + headerVarName + "\n\n" +
                    "#import <stdint.h>" + "\n\n" +
                    functions.map(func => cppForFunc(func, "declaration")).join("\n") +
                    "\n" +
                    "#endif",
                overwrite: true,
                runPrettier: false
            }
        );
        ensureFile({
                filename: `${baseFilename}.cpp`, contents: `#include "${baseFilename}.h"` + "\n\n" +
                    functions.map(func => cppForFunc(func, "definition")).join("\n"),
                overwrite: false,
                runPrettier: false
            }
        );
    }

    ensureFile({
        filename: `server.ts`,
        contents: trimMargin(
            // language=TypeScript
            `
            import {ServerModuleImpl} from "../../../module-tool/ServerModuleImpl";

            export default class ${titleCase(moduleName) + "Impl"} implements ServerModuleImpl {
                init() {}
                tick() {}
                destroy() {}
            };
            `),
        overwrite: false,
        runPrettier: true
    });
    ensureFile({
        filename: `ui.web.ts`,
        contents: ``,
        overwrite: false,
        runPrettier: true
    });

    ensureCFiles(`interop`, moduleDef.interopFunctions);

    moduleDef.platforms.forEach(platform => {
        const platformInfo = Platforms[platform];
        switch (platformInfo.language) {
            case "cpp": {
                ensureCFiles(`native.${platform}`, moduleDef.nativeFunctions);
            }
                return;

            case "javascript": {
                ensureTsFiles(`native.${platform}`, moduleDef.nativeFunctions);
            }
                return;
        }
    })
}

main();