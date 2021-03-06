# bears-32

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

## Git

### Branches Naming Conventions

Should be one of the following:

1. devops/x - where x is the change you do (for example `devops/webpack` will be used for adding webpack to our tool chain).
2. feature/x - where x is the feature we're adding (`feature/timer`).
3. bug/x - where x is a short description of the bug (`bug/timer_goes_backwards`)

Use underscore for spaces.

### When should we create a new branch.

If our change is not one of the above (for example documentation), or it's a small bug fix and it is made of 1 or 2 commits, it's ok to push to develop. Otherwise make a new branch.

Anyway, it's a good idea to let the other team members know about the change you made.

## How to use webpack

For now it's pretty basic, just run the following from the root of the project: `yarn build`.

If you want to make webpack build the bundle on every change run `yarn start`

We will be adding different loaders and scripts soon.

What webpack basically does is traversing the dependency tree.

It starts from a specific entry file (can be more than one file - each file will produce another bundle), and connect this file with its dependencies (`import` or `require`). For each of its dependencies it does the same.

With a blank configuration, webpack can only bundle `js` files, but we can change this by adding loaders.

A _loader_ is a function that takes a string as input (the dependency file content) and outputs a string. For example the babel loader will convert es6 specific code to es5.

## Packages Management

If we want to add a new js library, like `jquery`, we need to follow these steps:

1. Install the package: Run the following in the project root directory

```
yarn add jquery
```

2. Require it where you need it:

```
import $ from 'jquery'
```
