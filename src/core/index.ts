import { Configuration } from "../types";
import { writeErrorAndNoteThenExit } from "../utils/console";
import { performTransaction } from "./transaction";

export const execute = (config: Configuration): void => {
    if (!config.transactions)
        return writeErrorAndNoteThenExit(
            "No transaction defined in configuration",
            "Read more about it here: MISSING LINK");

    if (config.transactions instanceof Array) {
        for (const transaction of config.transactions) {
            performTransaction(config.vars, transaction)
        }
    } else {
        performTransaction(config.vars, config.transactions);
    }
}
