import { Configuration } from "../types";
import { writeErrorThenExit } from "../utils/console";
import { performTransaction } from "./transaction";

export const execute = (config: Configuration): void => {
    if (!config.transactions)
        return writeErrorThenExit("No transaction defined in configuration");

    if (config.transactions instanceof Array) {
        for (const transaction of config.transactions) {
            performTransaction(config, transaction)
        }
    } else {
        performTransaction(config, config.transactions);
    }
}