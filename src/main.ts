#!/usr/bin/env node

import { Command } from "commander";

import { name, description, version } from "../package.json";
import { DEFAULT_CONFIG_FILE_NAME, loadConfigFile } from "./config";
import { Configuration, execute } from "./core";
import { configureWriting } from "./utils/console";

const program: Command = new Command();

program
    .name(name)
    .description(description)
    .version(version)
    .argument("[config file]", "the configuration file", DEFAULT_CONFIG_FILE_NAME)
    .action((configFile: string) => {
        const configuration: Configuration = loadConfigFile(configFile);
        configureWriting(configuration.options.silent);

        execute(configuration);
    })
    .addCommand(program);

program.parse();