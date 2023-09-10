export function titleCase(input: string) {
    return input
        .split(/[-_]+/)
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join("");
}

export function camelCase(input: string) {
    const titleCased = titleCase(input);
    return titleCased[0].toLowerCase() + titleCased.slice(1);
}

export function snakeCase(input: string) {
    return input
        .split(/[-_]+/)
        .map(word => word.toLowerCase())
        .join("_");
}

export function kebabCase(input: string) {
    return input
        .split(/[-_]+/)
        .map(word => word.toLowerCase())
        .join("-");
}
