#!/usr/bin/env node

import { loadConfigFile } from "./config";
import { Configuration } from "./types";

const config: Configuration | undefined = loadConfigFile("tests/simple/smart-copy.json");
if (config === undefined) process.exit(0);

console.log(config);
