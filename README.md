# ts-nano

A nano-like text editor attached to a HTML element written in TypeScript.

## Installation

Works out of the box with webpack, so

```
npm install --save ts-nano
```

in your webpack project and you should be good to go.

## Usage

Regardless of your use case, `Editor` takes a `HTMLElement` and registers event listeners, so you can probably get away with

```
import { Editor } from 'ts-nano';

const div = document.createElement('div');
new Editor(div);
document.body.appendChild(div);
// or
new Editor(document.getElementById('editor')!);
```

## Demo

A demo is available at https://s1gtrap.github.io/ts-nano.
