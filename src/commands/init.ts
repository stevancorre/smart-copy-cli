import { existsSync, writeFileSync } from "fs";
import { DEFAULT_CONFIG, DEFAULT_CONFIG_FILE_NAME } from "../config";
import { Configuration } from "../core";
import { configureWriting, writeError, writeSuccess } from "../utils/console";
import { ICommand } from "./types/ICommand";

const INIT_CONFIGURATION: Configuration = {
    ...DEFAULT_CONFIG,
    vars: {
        outDir: "dist"
    },
    transactions: []
};

export const initCommand: ICommand = {
    name: "init",
    run: async (args: string[]) => {
        const silent: boolean = args.indexOf("--silent") !== -1;
        const force: boolean = args.indexOf("--force") !== -1;

        if (!force && existsSync(DEFAULT_CONFIG_FILE_NAME))
            return writeError(`This folder already contains a ${DEFAULT_CONFIG_FILE_NAME} file`);

        configureWriting(silent);

        const jsonConfig: string = JSON.stringify(INIT_CONFIGURATION, null, 4);
        writeFileSync(DEFAULT_CONFIG_FILE_NAME, jsonConfig);
        writeSuccess(`Initialized ${DEFAULT_CONFIG_FILE_NAME}`);
    }
}
