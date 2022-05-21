export interface ICommand {
    name: string;
    run: (args: string[]) => void;
}
