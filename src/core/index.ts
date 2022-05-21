import { writeErrorAndNoteThenExit } from "../utils/console";
import { performTransaction } from "./transaction";

import { Configuration } from "./types/Configuration";
import { ConfigurationOptions } from "./types/ConfigurationOptions";
import { Transaction } from "./types/Transaction";
import { VarDictionary } from "./types/VarDictionary";

export { Configuration, ConfigurationOptions, Transaction, VarDictionary };

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
