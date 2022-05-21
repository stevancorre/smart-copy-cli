import { Command } from "./types/Command";

type HelpCommandArgs = {
    name: string;
};

export const helpCommand: Command<HelpCommandArgs> = {
    name: "help",
    run: () => {
        console.log([
            "smart-copy [command]",
            "",
            "Usage:",
            "",
            "smart-copy        perform all transactions in config file smart-copy.json",
            "smart-copy [json] perform all transactions in provided config file",
            "smart-copy init   creates a config file in the current directory",
            "smart-copy help   show this help message"
        ].join("\n"));

        process.exit(0);
    }
}
