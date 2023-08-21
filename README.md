# dependency-submission-dump

A simple TypeScript library that enables local reuse of the GitHub's dependency-submission-api capability.

## Why

[GitHub's dependency-submission-api](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph) is a good abstraction for managing dependencenies above different languages. 

Also GitHub provides some tools for extracting [snapshot](https://github.com/github/dependency-submission-toolkit/blob/main/src/snapshot.ts) from codebase, like [dependency-submission-toolkit](https://github.com/github/dependency-submission-toolkit), and its ecosystems.

But by default, all these tools will always submit `snapshot` directly to GitHub without any switches to control. These is no way to reuse this abstraction.

## Goal

This tool allows developers to save/process the `snapshot` before it submitted. So that you can easily reuse all the data without accessing the GitHub.

## Installation

There are 3 ways to use.

### With Cmd: dump

```bash
npm install -g dependency-submission-dump
```

and:

```bash
DSD_OUTPUT=output.json DSD_ECOSYSTEM=node dsd dump
```

The `snapshot` object will be saved in `output.json`.

### With Cmd: dump and process with a script

You can also specify a JavaScript file for processing the `snapshot` directly.

```javascript
function dsdHandler(snapshot) {
    console.log("rece: " + JSON.stringify(snapshot))
}

module.exports = {
    dsdHandler: dsdHandler
};
```

and:

```bash
DSD_ADDON=./examples/sample_addon.js DSD_OUTPUT=output.json DSD_ECOSYSTEM=node dsd dump
```

and:

```text
rece: {"detector":{"name":"example NPM detector","url":"https://github.com/github/dependency-submission-toolkit/tree/main/example","version":"0.0.1"},"version":0,"job":{"id":"NaN"},"scanned":"2023-08-21T06:17:44.491Z","manifests":{"dependency-submission-dump" ...
```

### With Node

Or use it as a lib. See [examples/node](./examples/node/).

## Language support

This library is just a glue that combines different functionalities together for convenient and practical use.

So most of the logic will stay consistent with the source repository, except for some modifications to the format of certain environment variables. For more details, please refer to the source code.

| Ecosystem | Status | Source Code                                                                               |
|-----------|--------|-------------------------------------------------------------------------------------------|
| node      | ✅      | https://github.com/github/dependency-submission-toolkit/blob/main/example/npm-detector.ts |
| golang    | ✅      | https://github.com/actions/go-dependency-submission                                       |
| maven     | 🚧     | https://github.com/marketplace/actions/maven-dependency-tree-dependency-submission        |
| gradle    | 🚧     | https://github.com/marketplace/actions/gradle-dependency-submission                       |

## License

[MIT](LICENSE)
