import { loadConfigFile } from "../config";
import { configureWriting } from "../utils/console";
import { execute, Configuration } from "../core";

import { ICommand } from "./types/ICommand";
import { helpCommand } from "./help";
import { initCommand } from "./init";

const commands: ICommand[] = [
    helpCommand,
    initCommand
];

export const readArgs = (args: string[]) => {
    const commandIndex: number = commands.findIndex(x => x.name === args[2]);
    if (commandIndex !== -1) {
        commands[commandIndex].run(args.slice(3));
        process.exit(0);
    }

    // load configuration
    const configFile: string | undefined = process.argv[2];
    const config: Configuration = loadConfigFile(configFile);
    configureWriting(config.options.silent);

    // and run program
    execute(config);
};
