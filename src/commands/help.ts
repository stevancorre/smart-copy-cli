import { ICommand } from "./types/ICommand";

export const helpCommand: ICommand = {
    name: "help",
    run: () => {
        console.log([
            "smart-copy [command]",
            "",
            "Usage:",
            "",
            "smart-copy        perform all transactions in config file smart-copy.json",
            "smart-copy [json] perform all transactions in provided config file",
            "smart-copy help   show this help message"
        ].join("\n"));
    
        process.exit(0);
    }
}
