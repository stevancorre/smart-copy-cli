import { VarDictionary, ConfigurationOptions, Transaction } from ".";

export type Configuration = {
    vars?: VarDictionary,
    options: ConfigurationOptions;
    transactions?: (Transaction | string)[] | (Transaction | string);
}
