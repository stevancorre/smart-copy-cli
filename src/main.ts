#!/usr/bin/env node

import { Command } from "commander";
import { name, description, version } from "../package.json";
import { bindCommands } from "./commands";

const program: Command = new Command();

program
    .name(name)
    .description(description)
    .version(version);

bindCommands(program);

program.parse();