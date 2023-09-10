import {ModuleDefinition} from "../ModuleDefinition";

export default {
    name: "gpio-pin",
    platforms: [ "esp32", "web" ],
    description: "Module for controlling a single GPIO pin",

    paramGroups: [
        {
            params: [
                {
                    name: "pin",
                    description: "The native pin to control",
                    typeInfo: {
                        "@type": "range",
                        minInclusive: 0,
                        maxInclusive: 255,
                        roundTo: 1,
                    },
                }
            ]
        }
    ],
    interopFunctions: [],
    nativeFunctions: [
        {
            name: "initGpioPin",
            returnType: "boolean",
            parameters: [
                {
                    name: "pinNum",
                    type: "int32",
                }
            ]
        },

        {
            name: "releaseGpioPin",
            returnType: "boolean",
            parameters: [
                {
                    name: "pinNum",
                    type: "int32",
                }
            ]
        },

        {
            name: "setGpioPinValue",
            returnType: "boolean",
            parameters: [
                {
                    name: "pinNum",
                    type: "int32",
                }
            ]
        },


    ],
} satisfies ModuleDefinition