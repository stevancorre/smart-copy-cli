#!/usr/bin/env node

import { loadConfigFile } from "./config";
import { Configuration } from "./types";
import { execute } from "./core";
import { configureWriting } from "./utils/console";

const config: Configuration = loadConfigFile("tests/simple/smart-copy.json");
configureWriting(config);
execute(config);