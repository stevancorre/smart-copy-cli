#!/usr/bin/env node

import { loadConfigFile } from "./config";
import { Configuration } from "./types";
import { execute } from "./core";

const config: Configuration = loadConfigFile("tests/simple/smart-copy.json");
execute(config);