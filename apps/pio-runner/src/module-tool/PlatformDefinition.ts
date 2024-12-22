export interface PlatformDefinition {
    name: string
    language: LanguageSlug
}

export const Platforms = {
    esp32: {
        name: "ESP32",
        language: "cpp",
    },

    macos: {
        name: "macOS",
        language: "cpp",
    },

    web: {
        name: "Web",
        language: "javascript",
    }
};

export type PlatformSlug = keyof typeof Platforms;

export type LanguageSlug = "javascript" | "cpp";