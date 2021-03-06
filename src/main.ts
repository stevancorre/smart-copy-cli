#!/usr/bin/env node

import { Command } from "commander";

import { binName, description, version } from "../package.json";
import { initCommand } from "./commands/init";
import { DEFAULT_CONFIG_FILE_NAME, loadConfigFile } from "./config";
import { Configuration, execute } from "./core";
import { configureWriting } from "./utils/console";

const program: Command = new Command();

program
    .name(binName)
    .description(description)
    .version(version)
    .argument("[config file]", "the configuration file", DEFAULT_CONFIG_FILE_NAME)
    .action((configFile: string) => {
        const configuration: Configuration = loadConfigFile(configFile);
        configureWriting(configuration.options.silent);

        execute(configuration);
    })
    .addCommand(initCommand)
    .addHelpCommand();

program.parse();