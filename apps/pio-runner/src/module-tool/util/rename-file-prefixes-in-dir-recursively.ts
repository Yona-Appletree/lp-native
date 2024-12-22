import * as fs from "fs";
import * as path from "path";

export function renameFilePrefixesInDirRecursively(
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