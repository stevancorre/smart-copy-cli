#!/usr/bin/env node

import { loadConfigFile } from "./config";
import { Configuration } from "./types";
import { execute } from "./core";
import { configureWriting } from "./utils/console";

// load configuration
const configFile: string | undefined = process.argv[2];
const config: Configuration = loadConfigFile(configFile);
configureWriting(config);

// and run program
execute(config);