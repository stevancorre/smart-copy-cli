import { existsSync, readFileSync } from "fs";
import { writeError, writeNote } from "./utils/console";
import { Configuration } from "./core";

const DEFAULT_CONFIG_FILE_NAME: string = <const>"smart-copy.json";
const DEFAULT_CONFIG: Configuration = <const>{
    options: {
        silent: false
    },
};

export const loadConfigFile = (filePath: string = DEFAULT_CONFIG_FILE_NAME): Configuration => {
    if (!existsSync(filePath)) {
        writeError(`Config file not found: \`${filePath}\``);
        if (filePath != DEFAULT_CONFIG_FILE_NAME)
            writeNote(`You can use the default config path to avoid passing it as a parameter`);
        writeNote("Read more about it here: MISSING LINK");

        return process.exit(1);
    }

    const rawConfig: string = readFileSync(filePath).toString();
    const config: Configuration = JSON.parse(rawConfig) as Configuration;

    return { ...DEFAULT_CONFIG, ...config };
}