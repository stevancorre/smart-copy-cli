import { Command } from "commander";
import { initCommand } from "./init";

const commands: Command[] = [initCommand];

export const bindCommands = (program: Command): void => {
    for (const command of commands) {
        program.addCommand(command);
    }
}
