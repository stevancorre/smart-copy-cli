import { copy } from "fs-extra";
import { glob } from "glob";
import path from "path";

import { writeErrorAndNoteThenExit, writeErrorThenExit, writeSuccess, writeWarning } from "../utils/console";
import { Configuration, Transaction, VarDictionary } from "../types";

export const performTransaction = (config: Configuration, transaction: Transaction | string): void => {
    const parsedTransaction: Transaction = parse(transaction);
    parsedTransaction.in = applyVar(config.vars, parsedTransaction.in);
    parsedTransaction.out = applyVar(config.vars, parsedTransaction.out);

    const patterns: string[] = parsedTransaction.in.split(",");
    for (const pattern of patterns) {
        glob(pattern, async (error: Error | null, files: string[]) => {
            if (error) return writeErrorAndNoteThenExit(error.message, `At \`\``);
            if (files.length === 0) return writeWarning(`Skipped: pattern \`${pattern}\` found nothing`);

            for (const file of files) {
                await copy(file, path.join(parsedTransaction.out, file));

                writeSuccess(`Transaction done: ${file} -> ${parsedTransaction.out}`);
            }
        });
    }
};

const parse = (transaction: Transaction | string): Transaction => {
    if (typeof transaction === "string") {
        const regex: RegExp = /^(.*\S.*)->(.*\S.*)$/g;
        const match: RegExpExecArray | null = regex.exec(transaction);
        if (match === null || match.length !== 3) {
            return writeErrorAndNoteThenExit(
                `Invalid transaction: \`${transaction}\``,
                "The format should be `from -> to`"
            );
        }

        return { in: match[1], out: match[2] };
    }

    return transaction;
};

const applyVar = (vars: VarDictionary | undefined, on: string): string => {
    on = on.trim();

    const regex: RegExp = /{{(.+?(?=}}))/g;
    const match: RegExpExecArray | null = regex.exec(on);
    if (match === null || match.length !== 2) return on;

    const key: string = match[1];
    const formattedVar: string = `{{${key}}}`;

    const value: string | undefined = vars?.[key];
    if (value === undefined) return writeErrorThenExit(`Undefined variable \`${key}\``);
    if (value.indexOf(formattedVar) !== -1) return writeErrorThenExit(`Detected recursive variable declaration in \`${key}\``);

    on = on.replace(formattedVar, value);
    return applyVar(vars, on);
}
