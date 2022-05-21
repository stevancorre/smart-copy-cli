import { loadConfigFile } from "../config";
import { configureWriting } from "../utils/console";
import { execute, Configuration } from "../core";

import { ICommand } from "./types/ICommand";
import { helpCommand } from "./help";

const commands: ICommand[] = [
    helpCommand
];

export const readArgs = (args: string[]) => {
    const commandIndex: number = commands.findIndex(x => x.name === args[2]);
    if (commandIndex !== -1) {
        commands[commandIndex].run(args);
        process.exit(0);
    }

    // load configuration
    const configFile: string | undefined = process.argv[2];
    const config: Configuration = loadConfigFile(configFile);
    configureWriting(config);

    // and run program
    execute(config);
};