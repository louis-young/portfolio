# Project Structure

A fast, scalable, modular and extendable front-end project structure for rapid development.

## Features

- Local development server.
- Scalable and modular architecture.
- Markup, Sass and JavaScript linting.
- JavaScript bundling, transpiling and minification.
- Sass preprocessing, auto-prefixing and minification.
- Static asset optimization.
- Base resets, styles and variables.
- Build commands to generate a deployment ready archive.

## System Requirements

You'll need the following installed on your local machine.

1.  [Node.js](https://nodejs.org/en/download/)

## Setup

**1. Clone the repository and install with NPM**

To set up the project structure, simply clone the git repository and install NPM.

```
$ git clone git@bitbucket.org:FluidStudiosStaff/project-structure.git
$ npm install
```

**2. Run**

There are different tasks which you can run depending on your needs:

- `$ npm start` - start the local development server and live watch file changes.
- `$ npm run lint` - lint scripts, stylesheets and markup.
- `$ npm run package` - generate a production archive and directory which is ready to deploy.

Simply run any command in the project root directory such as:

`$ npm start`

## Architecture

The root contains two directories:

- `node_modules`

- `public`

`node_modules` can be ignored as they never need to be edited. They are automatically populated based on the dependencies when installed.

`public` contains two directories:

- `dist`

- `src`

`dist` contains a compiled version of the source code/assets which is read-only (do not touch).

`src` contains the working source code.

Inside of `src` there are three directories:

- `assets` - contains all of the static assets used in the project such as images, videos etc.

- `scripts` - contains your JavaScript (including frameworks and libraries which aren't included via CDN).

- `stylesheets` - contains the Sass architecture.

## JavaScript

Scripts are linted automatically for you to ensure a high code standard and fewer errors at runtime.

The `scripts` directory in the project structure contains a vendor subdirectory for frameworks and libraries (if not using a CDN).

The `main.js` file in located in the root of `scripts`.

The JavaScript structure is as follows:

- `public/src/scripts/bundle.js` - The entry file for bundling.

- `public/src/scripts/main.js` - The main script file.
- 
- `public/src/scripts/vendor/*.js` - Third party scripts/libraries/frameworks.

You can add as many files to the `/scripts/` directory as you wish and add the import in to `bundle.js` and these will be bundled, transpiled and minified for production.

## Sass

[https://sass-guidelin.es/#architecture](https://sass-guidelin.es/#architecture)

## Miscellaneous

### Linting

All of your markup, Sass and JavaScript is automatically linted on change. The output will appear in the console and will prevent poor code, bad convention and will lower the amount of silent/runtime errors.

This can also be run as a separate task by running `$ npm run lint`.

These can be configured by editing the associated linter configuration file in the `configuration` directory.

### Sourcemaps

When using compilers and combining files, you need to keep track (a map) of where this code originated from. This helps immensely when debugging a project as you can see which file an error/warning is being thrown from and view this as source code.

Simply use developer tools as you would usually, it's all handled for you.

## Compilation

### Sass

Every Sass file and partial is linted, compiled, minified, prefixed and added in to the `main.min.css` file.

### JavaScript

You can place multiple scripts in any of the scripts directories and import them in the `bundle.js` file. These will all be compiled and bundled in to the `bundle.min.js` file.

### Assets

Static assets are automatically compressed/optimised and moved to the `dist` directory. This supports most common static asset file types and also supports subdirectories.
