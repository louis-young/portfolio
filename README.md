# Portfolio

A personal portfolio website.

![Portfolio](documentation/portfolio.jpg)

## Technologies

- HTML5.
- Sass (BEM).
- JavaScript.

### System Requirements

You'll need the following installed on your local machine.

1. [Node.js](https://nodejs.org/en/download/)

### Setup

1. Clone the repository and install with NPM

To set up the project structure, simply clone the git repository and install NPM.

```terminal
$ git clone git@github.com:louis-young/website-boilerplate.git
$ npm install
```

2. Run

There are different tasks which you can run depending on your needs:

- `$ npm start` - start the local development server and live watch file changes.
- `$ npm run lint` - lint scripts, stylesheets and markup.
- `$ npm run package` - generate a production archive and directory which is ready to deploy.

Simply run any command in the project root directory such as:

`$ npm start`

### Sass

[https://sass-guidelin.es/#architecture](https://sass-guidelin.es/#architecture)

### Miscellaneous

#### Linting

All of your markup, Sass and JavaScript is automatically linted on change. The output will appear in the console and will prevent poor code, bad convention and will lower the amount of silent/runtime errors.

This can also be run as a separate task by running `$ npm run lint`.

These can be configured by editing the associated linter configuration file in the `configuration` directory.

#### Sourcemaps

When using compilers and combining files, you need to keep track (a map) of where this code originated from. This helps immensely when debugging a project as you can see which file an error/warning is being thrown from and view this as source code.

Simply use developer tools as you would usually, it's all handled for you.

### Compilation

#### Sass

Every Sass file and partial is linted, compiled, minified, prefixed and added in to the `main.min.css` file.

#### JavaScript

You can place multiple scripts in any of the scripts directories and import them in the `bundle.js` file. These will all be compiled and bundled in to the `bundle.min.js` file.

#### Assets

Static assets are automatically compressed/optimised and moved to the `dist` directory. This supports most common static asset file types and also supports subdirectories.
