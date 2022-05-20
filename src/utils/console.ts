const RESET: string = <const>"\x1b[0m";

const RED: string = <const>"\x1b[31m";
const GREEN: string = <const>"\x1b[32m";
const YELLOW: string = <const>"\x1b[33m";
const CYAN: string = <const>"\x1b[36m";

export const writeWarning = (message: string): void => write("warning", YELLOW, message);
export const writeError = (message: string): void => write("error", RED, message);
export const writeNote = (message: string): void => write("note", CYAN, message);
export const writeSuccess = (message: string): void => write("success", GREEN, message);

const write = (label: string, color: string, message: string): void =>
    console.log(`${color}${label}:${RESET} ${message}`);
