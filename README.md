# @qpyracuk/text-builder

## Introduction

Immediately after writing an object serializer in XML [@qpyracuk/xml-builder](https://www.npmjs.com/package/@qpyracuk/xml-builder), an idea came to me - based on an already existing _“engine”_, create an object serializer into plain text.
Having brewed 1 more cup of coffee, I got to work, and half an hour later, another bag was ready!

## Installation

This is a JS library available through the npm registry.
Before installation, you need to download and install `Node.js`.
Requires `Node.js v8.0.0 or higher`.

If this is a completely new project, be sure to create a `package.json` file using the npm init command.

To install the package, enter the `npm install @qpyracuk/text-builder` command in the console.

```sh
npm install @qpyracuk/text-builder
```

## Features

- Support for `Map` and `Set` data structures;
- Pretty output mode;
- Adjusting tab size in pretty mode;
- Displaying variable `types`;
- High serialization speed;
- Changing the encoding.

## Quick Start

After installing the package, import the library.

For ESMAScript modules:

```js
import TEXT from '@qpyracuk/text-builder';
```

For CommonJS modules:

```js
const TEXT = require('@qpyracuk/text-builder');
```

### Usage example

#### We create an object that needs to be traversed

```js
const futureText = {
  primitive: '1',
  object: {
    primitive: 3,
    array: ['1', 2, 'three'],
    set: new Set([1, 2, new Map([['key', { field: { value: 100 } }]])]),
    map: new Map([['key', { value: 10 }]])
  }
};

const builder = TEXT.createBuilder({ pretty: true, typed: true });
const text = builder.stringify(futureText);
```

## Options

### pretty: `boolean`

Generate a text model of an object with indents and tabs.

### typed: `boolean`

Sign the type of fields of objects or variables.

### tab: `number | 'tab'`

Tab size in spaces if specified as a positive numeric value.
Is it possible to specify `'tab'` and then all whitespace characters will become `\t`.

## Builder methods

### stringify(data: any): `string`

Serializes data into text.
Yes, it's simple!

## Author

The author of the library is Pobedinskiy David.

## Bugs

If you encounter unexpected errors, please let me know.
By e-mail [qpyracuk@gmail.com](qpyracuk@gmail.com) or in [Telegram](https://t.me/qpyracuk).

## Support the author

If my work has helped you make your life easier, you can support me with your donations.

[Boosty](https://boosty.to/qpyracuk)

[Patreon](https://patreon.com/qpyracuk)

Search npm for other libraries with the @qpyracuk prefix. Perhaps you will find something useful for your project.
