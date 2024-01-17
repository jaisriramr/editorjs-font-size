# editor-font-size

Font size inline tool developed for [Editor.js](https://editorjs.io).

## Installation

### Install via NPM or Yarn

Get the package

```shell
npm i editor-font-size
```

or

```shell
yarn add editor-font-size
```

Include module in your application

```typescript
import Fontsize from "editor-font-size";
```

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```typescript

  ...

  tools: {
    ...
    fontsize: Fontsize
  }
  ...

```
