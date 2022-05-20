import { existsSync, readFileSync } from "fs";
import { writeError, writeNote } from "./utils/console";
import { Configuration } from "./types";

const DEFAULT_CONFIG_FILE_NAME: string = <const>"smart-copy.json";
const DEFAULT_CONFIG: Configuration = <const>{
    options: {
        silent: false
    },
};

export const loadConfigFile = (filePath: string = DEFAULT_CONFIG_FILE_NAME): Configuration | undefined => {
    if (!existsSync(filePath)) {
        writeError(`Config file not found: \`${filePath}\``);
        if (filePath != DEFAULT_CONFIG_FILE_NAME)
            writeNote(`You can use the default config path to avoid passing it as a parameter: \`${DEFAULT_CONFIG_FILE_NAME}\``);

        return;
    }

    const rawConfig: string = readFileSync(filePath).toString();
    const config: Configuration = JSON.parse(rawConfig) as Configuration;

    return { ...DEFAULT_CONFIG, ...config };
}
