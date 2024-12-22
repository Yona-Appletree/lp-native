/**
 * Trims common whitespace off every non-empty line in `input`.
 */
export function trimMargin(
    input: string
): string {
    const lines = input.split("\n")
    const commonWhitespace = lines
        .filter(line => line.length > 0)
        .reduce((commonWhitespace, line) => {
            const whitespace = line.match(/^\s*/)?.[0] ?? "";
            return whitespace.length < commonWhitespace.length
                ? whitespace
                : commonWhitespace
        });

    return lines.map(line => line.startsWith(commonWhitespace) ? line.slice(commonWhitespace.length) : line).join("\n");
}