export const getFileNameWithoutExtension = (path: string) =>
    path.replace(/^.*(\\|\/|\:)/, "").replace(/\.[^.]*$/g, "");