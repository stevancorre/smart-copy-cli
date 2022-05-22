# A tool to help you copying files around in your project

## Table of content
- [Installation](#installation)
- [Configuration](#configuration)
- [Commands](#commands)
- [License](#license)

## Installation

```sh
$ npm install -g smart-copy-cli
```

## Configuration

The configuration file contains three parts: the options, the variables and the transactions. See:

```json
{
    "options": {},
    "vars": {},
    "transactions": []
}
```

### Options

|  Name  |                                                           Type                                                          |  Default |                                           Description                                          |
|--------|-------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------|
| silent |  [boolean](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean) |  false   |  Block application from writing to [stdout](https://nodejs.org/api/process.html#processstdout) |

### Variables

You can defines variables in the `vars` section. See this example bellow:
```json
"variables": {
    "outDir": "dist"
}
```
You can use variables inside a variable definition too (order doesn't matters):
```json
"variables": {
    "srcDir": "src",
    "outDir": "{{ srcDir }}/dist"
}
```

Some variables are reserved, here is a complete list:

| Name |                         Description                         |
|------|-------------------------------------------------------------|
| file |  Represents the file name in a [transaction](#transactions) |

### Transactions

Here is how you can define transactions:
- If you have only one transaction to describe
    ```json
    "transactions": "[filter] -> [output]"
    ```
- If you have mutliple transactions to process
    ```json
    "transactions": [
        "[filter] -> [output]",
        "[filter] -> [output]",
        {
            "in": "[filter]",
            "out": "[output]"
        }
    ]
    ```

#### Input filter

The input filter is basically a [glob pattern](https://en.wikipedia.org/wiki/Glob_(programming)). You can have multiple patterns in the same filter by seperating them with a comma. See:
```json
"*.html,css/*.css -> [output]"
```

#### Output path

The output path is either a folder or a pattern made to change the file extension for some reason. See:
```json
"[filter] -> dist"
```

You can use variables here
```json
"[filter] -> {{ outDir }}"
```

To change the extensions:
```json
"[filter] -> {{ outDir }}/{{ file }}.ext"
```
**Note that you can only use the `file` variable at the end of the output expression**

## Commands

#### Usage

```console
$ smart-copy [options] [command] [config file]
```

#### Example

Load the configuration from `smart-copy.json` in the current directory:
```console
$ smart-copy
```

Load the configuration from `my-config-file.json` in the current directory:
```console
$ smart-copy my-config-file.json
```

### 🏃 Initialization

Creates a simple `smart-copy.json` config file in the current directory:
```json
{
    "options": {
        "silent": false
    },
    "vars": {
        "outDir": "dist"
    },
    "transactions": []
}
```

#### Usage

```console
$ smart-copy init [options]
```

#### Options

|  Name  |                                                           Type                                                          |  Default |                                           Description                                          |
|--------|-------------------------------------------------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------------------|
| silent |  [boolean](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean) |  false   |  Block application from writing to [stdout](https://nodejs.org/api/process.html#processstdout) |
| force  |  [boolean](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean) |  false   |  Overrides any existing configuration file                                                     |

### Help

Display help for the CLI or a specific command

#### Usage

```console
$ smart-copy help [command]
```

## License

This project is <a href="https://opensource.org/licenses/MIT">MIT</a> licensed.