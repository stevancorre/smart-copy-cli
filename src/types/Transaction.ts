export type Transaction = {
    in: string,
    out: string,
    flatten?: boolean,
    recursive: boolean
} | string;
