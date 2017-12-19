# bears-32

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

* Requirements
* Installing the environment
* Running the extension in dev mode
* Naming conventions
* How to use webpack.

## Requirements

1. [node](https://nodejs.org/en/)
2. [yarn](https://yarnpkg.com/en/docs/install)

## Installing environment

1. Run `yarn`
2. Run `npx webpack`

## Running the extension

1. Open [chrome://extensions](chrome://extensions)
2. Enable `Developer Mode` (by checking the box in the top right corner of the page).
3. Press the button `Load unpacked extension`
4. Navigate to the repository folder and press `Open` or `Select`
5. You should now see the extension when you open a new tab.
6. You can reload the extension by pressing `Reload` under the extension name.

**Note** : You'll probably need to reload the extension more than once, so leave this tab open.

## Naming Conventions

## How to use webpack

For now it's pretty basic, just run the following from the root of the project: `npx webpack`.
We will be adding different loaders and scripts soon.

What webpack basically does is traversing the dependency tree.

It starts from a specific entry file (can be more than one file - each file will produce another bundle), and connect this file with its dependencies (`import` or `require`). For each of its dependencies it does the same.

With a blank configuration, webpack can only bundle `js` files, but we can change this by adding loaders.

A _loader_ is a function that takes a string as input (the dependency file content) and outputs a string. For example the babel loader will convert es6 specific code to es5.
