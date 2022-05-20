import { writeErrorAndNoteThenExit, writeErrorThenExit, writeSuccess } from "../utils/console";
import { Configuration, Transaction, VarDictionary } from "../types";

export const performTransaction = (config: Configuration, transaction: Transaction | string): void => {
    const parsedTransaction: Transaction = parse(transaction);
    parsedTransaction.in = applyVar(config.vars, parsedTransaction.in);
    parsedTransaction.out = applyVar(config.vars, parsedTransaction.out);

    // TODO: implement
    throw "not implemented";

    writeSuccess(`Transaction performed: ${parsedTransaction.in} -> ${parsedTransaction.out}`);
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
