import * as fs from 'fs'
import * as path from 'path'
import {cppTypeForPrimitiveType, ModuleDefinition, NativeFunctionDefinition} from "./ModuleDefinition";
import {Platforms} from "./PlatformDefinition";

async function main() {
    const modulesDir = path.normalize(path.dirname(process.argv[1]));

    // update all modules
    fs.readdirSync(modulesDir).forEach(moduleName => {
        updateModule(modulesDir, moduleName);
    });
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
    if (! fs.existsSync(moduleImplDir)) {
        fs.mkdirSync(moduleImplDir);
    }

    console.log(`Updating module "${moduleDef.name}" at ${moduleDir}...`);

    function ensureFile(
        {filename, contents, overwrite}: { filename: string, contents: string, overwrite: boolean },
    ) {
        const filePath = path.join(moduleImplDir, filename);

        if (!fs.existsSync(filePath) || overwrite) {
            fs.writeFileSync(filePath, contents);
            console.log(`Created file ${filename}`);
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
            case "declaration": return declaration + ";\n";
            case "definition": return declaration + " {\n\n}\n";
        }
    }

    function ensureTsFiles(
        baseFilename: string,
        functions: NativeFunctionDefinition[],
    ) {
        const typeName = baseFilename
            .split(/[^a-z0-9]+/i)
            .map(word => word[0].toUpperCase() + word.slice(1))
            .join("");

        ensureFile({
            filename: `${baseFilename}.d.ts`,
            contents: `
            export interface ${typeName} {
                ${functions.map(def => `${def.name}: (` + def.parameters.map(param => `${param.name}: ${param.type}`).join(", ") + `) => ${def.returnType}\n`).join("\n")}
            }
            `,
            overwrite: true
        });

        ensureFile({
            filename: `${baseFilename}.ts`,
            contents: `
            import {${typeName}} from "./${baseFilename}.d.ts";
            
            export default {
                ${functions.map(def => `${def.name}(${def.parameters.map(param => `${param.name}: ${param.type}`).join(", ")}) => ${def.returnType} {\n\n}\n`).join(",\n")}
            } satisfies ${typeName};
            `,
            overwrite: false
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
                filename: `${baseFilename}.h`, contents: "#ifndef " + headerVarName + "\n" +
                    "#define " + headerVarName + "\n\n" +
                    "#import <stdint.h>" + "\n\n" +
                    functions.map(func => cppForFunc(func, "declaration")).join("\n") +
                    "\n" +
                    "#endif", overwrite: true
            }
        );
        ensureFile({
                filename: `${baseFilename}.cpp`, contents: `#include "${baseFilename}.h"` + "\n\n" +
                    functions.map(func => cppForFunc(func, "definition")).join("\n"), overwrite: false
            }
        );
    }

    ensureFile({filename: `${moduleName}.server.ts`, contents: ``, overwrite: false});
    ensureFile({filename: `${moduleName}.client.ts`, contents: ``, overwrite: false});

    ensureCFiles(`${moduleName}.interop`, moduleDef.interopFunctions);

    moduleDef.platforms.forEach(platform => {
        const platformInfo = Platforms[platform];
        switch (platformInfo.language) {
            case "cpp": {
                ensureCFiles(`${moduleName}.native.${platform}`, moduleDef.nativeFunctions);
            } return;

            case "javascript": {
                ensureTsFiles(`${moduleName}.native.${platform}`, moduleDef.nativeFunctions);
            } return;
        }
    })
}

function renameFilePrefixesInDirRecursively(
    dir: string,
    oldPrefix: string,
    newPrefix: string,
) {
    fs.readdirSync(dir).forEach(filename => {
        const filePath = path.join(dir, filename);
        if (fs.statSync(filePath).isDirectory()) {
            renameFilePrefixesInDirRecursively(filePath, oldPrefix, newPrefix);
        } else {
            if (filename.startsWith(oldPrefix)) {
                fs.renameSync(filePath, path.join(dir, filename.replace(oldPrefix, newPrefix)));
            }
        }
    })
}

main();