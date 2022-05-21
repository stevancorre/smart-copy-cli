import { Transaction, ConfigurationOptions, VarDictionary } from "..";

export type Configuration = {
    vars?: VarDictionary,
    options: ConfigurationOptions;
    transactions?: (Transaction | string)[] | (Transaction | string);
}