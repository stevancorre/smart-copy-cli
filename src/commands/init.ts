import { Command } from "commander";
import { existsSync, writeFileSync } from "fs";

import { Configuration } from "../core";
import { configureWriting, writeError, writeSuccess } from "../utils/console";
import { DEFAULT_CONFIG, DEFAULT_CONFIG_FILE_NAME } from "../config";

const INIT_CONFIGURATION: Configuration = {
    ...DEFAULT_CONFIG,
    vars: {
        outDir: "dist"
    },
    transactions: []
};

type InitCommandOptions = {
    silent: boolean;
    force: boolean;
}

export const initCommand: Command = new Command()
    .name("init")
    .description("creates a simple config file in the current directory")
    .option("-s,--silent", "block the app from writing to stdout")
    .option("-f,--force", "overrides any existing configuration file")
    .action((options: InitCommandOptions) => {
        if (!options.force && existsSync(DEFAULT_CONFIG_FILE_NAME))
            return writeError(`This folder already contains a ${DEFAULT_CONFIG_FILE_NAME} file`);

        configureWriting(options.silent);

        const jsonConfig: string = JSON.stringify(INIT_CONFIGURATION, null, 4);
        writeFileSync(DEFAULT_CONFIG_FILE_NAME, jsonConfig);
        writeSuccess(`Initialized ${DEFAULT_CONFIG_FILE_NAME}`);
    });
