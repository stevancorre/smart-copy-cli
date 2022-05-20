import { VarDictionary, ConfigurationOptions, Transaction } from ".";

export type Configuration = {
    vars?: VarDictionary,
    options: ConfigurationOptions;
    transations?: Transaction[] | Transaction;
}
