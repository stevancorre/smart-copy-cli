import { copy } from "fs-extra";
import { glob } from "glob";
import path from "path";

import { writeErrorAndNoteThenExit, writeErrorThenExit, writeSuccess, writeWarning } from "../utils/console";
import { VarDictionary, Transaction } from "../types";

export const performTransaction = (vars: VarDictionary | undefined, transaction: Transaction | string): void => {
    const parsedTransaction: Transaction = parse(transaction);
    applyVars(vars, parsedTransaction);

    const patterns: string[] = parsedTransaction.in.split(",");
    for (const pattern of patterns) {
        glob(pattern, async (error: Error | null, files: string[]) => {
            if (error) return writeErrorAndNoteThenExit(error.message, `At \`\``);
            if (files.length === 0) return writeWarning(`Skipped: pattern \`${pattern}\` found nothing`);

            for (const file of files) {
                const outPath: string = getOutPath(parsedTransaction.out, file);
                await copy(file, outPath);

                writeSuccess(`Transaction done: ${file} -> ${outPath}`);
            }
        });
    }
};

const getOutPath = (outBasePath: string, file: string): string => {
    if (/{{( +)?file( +)?}}/g.test(outBasePath)) {
        if (!/{{( +)?file( +)?}}(\.[^.]*$)?$/g.test(outBasePath)) return writeErrorAndNoteThenExit(
            "Variable `file` must be at the end of the path",
            "Read more about it here: MISSING LINK");

        // replace dirs then extension
        const fileName: string = file.replace(/^.*(\\|\/|\:)/, "").replace(/\.[^.]*$/g, "");
        return outBasePath.replace(/{{( +)?file( +)?}}/g, fileName);
    }

    return path.join(outBasePath, file);
}

const parse = (transaction: Transaction | string): Transaction => {
    if (typeof transaction === "string") {
        const regex: RegExp = /^(.*\S.*)->(.*\S.*)$/g;
        const match: RegExpExecArray | null = regex.exec(transaction);
        if (match === null || match.length !== 3) {
            return writeErrorAndNoteThenExit(
                `Invalid transaction: \`${transaction}\``,
                "The format should be `from -> to`");
        }

        return { in: match[1], out: match[2] };
    }

    return transaction;
};

const applyVars = (vars: VarDictionary | undefined, on: Transaction): void => {
    on.in = applyVar(vars, on.in);
    on.out = applyVar(vars, on.out);

    if (/{{( +)?file( +)?}}/g.test(on.in)) return writeErrorAndNoteThenExit(
        "Reserved variable name: `file`",
        "Read more about it here: MISSING LINK")
}

const applyVar = (vars: VarDictionary | undefined, on: string): string => {
    on = on.trim();

    const regex: RegExp = /{{([^file].+?(?=}}))/g;
    const match: RegExpExecArray | null = regex.exec(on);
    if (match === null || match.length !== 2) return on;

    const key: string = match[1].trim();

    const formattedVar: string = `{{${key}}}`;

    const value: string | undefined = vars?.[key];
    if (value === undefined) return writeErrorThenExit(`Undefined variable \`${key}\``);
    if (value.indexOf(formattedVar) !== -1) return writeErrorThenExit(`Detected recursive variable declaration in \`${key}\``);

    on = on.replace(formattedVar, value);
    return applyVar(vars, on);
}
