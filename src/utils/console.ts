import { Configuration } from "../core";

const RESET: string = <const>"\x1b[0m";

const RED: string = <const>"\x1b[31m";
const GREEN: string = <const>"\x1b[32m";
const YELLOW: string = <const>"\x1b[33m";
const CYAN: string = <const>"\x1b[36m";

let silent: boolean;

export const configureWriting = (config: Configuration) => silent = config.options.silent;

export const writeWarning = (message: string): void => write("warning", YELLOW, message, false);
export const writeError = (message: string): void => write("error", RED, message, true);
export const writeNote = (message: string): void => write("note", CYAN, message, false);
export const writeSuccess = (message: string): void => write("success", GREEN, message, false);

export const writeErrorAndNoteThenExit = (error: string, note: string): never => {
    writeError(error);
    writeNote(note);

    return process.exit(1);
};

export const writeErrorThenExit = (error: string): never => {
    writeError(error);

    return process.exit(1);
};

const write = (label: string, color: string, message: string, force: boolean): void => {
    if (silent && !force) return;

    console.log(`${color}${label}:${RESET} ${message}`);
}    
