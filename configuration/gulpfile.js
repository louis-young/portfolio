/**
 * Watch and handle workflow automation tasks.
 *
 * @author Louis Young
 * @version 1.2.0
 * @licence MIT
 */

// Dependencies
const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass");
const eslint = require("gulp-eslint");
const sassLint = require("gulp-sass-lint");
const htmlLint = require("gulp-html-lint");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const del = require("del");
const zip = require("gulp-zip");
const log = require("fancy-log");
const colour = require("ansi-colors");
const browserSync = require("browser-sync").create();

// Directory paths.
const paths = {
  src: "../public/src/",
  dist: "../public/dist/",
  build: "../build/",
  package: [
    "../public/dist/**.**",
    "../public/dist/**/*",
    "../public/dist/.htaccess"
  ]
};

// Logger icons.
const icons = {
  success: "✓",
  warn: "⚠",
  info: "ℹ"
};

// Production mode.
let production = false;

/**
 * Compile Sass.
 */

const compileStyles = () => {
  log.info(colour.blue(`${icons.info} Styles compiled`));

  return gulp
    .src(`${paths.src}stylesheets/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(
      sassLint({
        configFile: ".sass-lint.json"
      })
    )
    .pipe(sassLint.format())
    .pipe(
      sass({
        outputStyle: "compressed",
        errLogToConsole: true,
        includePaths: `${paths.src}stylesheets`
      })
    )
    .on("error", sass.logError)
    .pipe(autoprefixer())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${paths.dist}stylesheets/`))
    .pipe(browserSync.stream());
};

gulp.task("compileStyles", compileStyles);

/**
 * Compile scripts.
 */

const compileScripts = () => {
  const stream = gulp.src(`${paths.src}scripts/*.js`);
  stream
    .pipe(plumber())
    .pipe(eslint(".eslintrc.json"))
    .pipe(eslint.format());

  return gulp
    .src(`${paths.src}scripts/entry.js`)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      webpack({
        mode: production ? "production" : "development",
        entry: `${paths.src}scripts/entry.js`,
        target: "web",
        output: {
          filename: "bundle.min.js"
        },
        stats: {
          version: false,
          timings: false,
          builtAt: false,
          entrypoints: false
        }
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(`${paths.dist}scripts/`));
};

gulp.task("compileScripts", compileScripts);

/**
 * Compile HTML.
 */

const compileMarkup = () => {
  log.info(colour.blue(`${icons.info} Markup compiled`));

  return gulp
    .src(`${paths.src}**/*.html`)
    .pipe(plumber())
    .pipe(
      htmlLint({
        htmllintrc: ".html-lintrc.json",
        useHtmllintrc: true
      })
    )
    .pipe(htmlLint.format())
    .pipe(gulp.dest(`${paths.dist}`));
};

gulp.task("compileMarkup", compileMarkup);

/**
 * Update configuration.
 */

const updateConfiguration = () => {
  log.info(colour.blue(`${icons.info} Configuration updated`));

  return gulp
    .src(`${paths.src}**/*.{htaccess,txt}`, { dot: true })
    .pipe(plumber())
    .pipe(gulp.dest(`${paths.dist}`));
};

gulp.task("updateConfiguration", updateConfiguration);

/**
 * Optimize static assets.
 */
const compressAssets = () => {
  log.info(colour.blue(`${icons.info} Assets optimised`));

  return gulp
    .src(`${paths.src}assets/**/*`)
    .pipe(plumber())
    .pipe(
      imagemin([
        imagemin.jpegtran({
          progressive: true,
          silent: true,
          verbose: false
        }),
        imagemin.optipng({
          optimizationLevel: 5,
          silent: true,
          verbose: false
        }),
        imagemin.gifsicle({
          interlaced: true,
          silent: true,
          verbose: false
        }),
        imagemin.svgo({
          silent: true,
          verbose: false,
          plugins: [{ removeViewBox: false }]
        })
      ])
    )
    .pipe(gulp.dest(`${paths.dist}assets/`));
};

gulp.task("compressAssets", compressAssets);

/**
 * Lint Sass.
 */

const lintStyles = () => {
  return gulp
    .src(`${paths.src}stylesheets/**/*.scss`)
    .pipe(plumber())
    .pipe(
      sassLint({
        configFile: ".sass-lint.json"
      })
    )
    .pipe(sassLint.format());
};

gulp.task("lintStyles", lintStyles);

/**
 * Lint scripts.
 */

const lintScripts = () => {
  return gulp
    .src(`${paths.src}scripts/**.*`)
    .pipe(plumber())
    .pipe(eslint(".eslintrc.json"))
    .pipe(eslint.format());
};

gulp.task("lintScripts", lintScripts);

/**
 * Lint HTML.
 */

const lintMarkup = () => {
  return gulp
    .src(`${paths.src}**/*.html`)
    .pipe(
      htmlLint({
        htmllintrc: ".html-lintrc.json",
        useHtmllintrc: true
      })
    )
    .pipe(htmlLint.format());
};

gulp.task("lintMarkup", lintMarkup);

/**
 * Clean the distributable directory.
 */

const clean = () => {
  log.info(colour.green(`${icons.success} Distributable directory cleaned`));
  log.info("");

  return del(`${paths.dist}**`, {
    force: true
  });
};

gulp.task("clean", clean);

/**
 * Clean the build directory.
 */

const cleanBuild = () => {
  log.info(colour.green(`${icons.success} Build directory cleaned`));

  return del(`${paths.build}**`, {
    force: true
  });
};

gulp.task("cleanBuild", cleanBuild);

/**
 * Clean the assets directory.
 */

const cleanAssets = () => {
  return del(`${paths.dist}/assets/**`, {
    force: true
  });
};

gulp.task("cleanAssets", cleanAssets);

/**
 * Launch a development server.
 */

const server = () => {
  browserSync.init({
    server: paths.dist,
    notify: false,
    scrollProportionally: false,
    logLevel: "silent"
  });

  log.info(colour.green(`${icons.success} Starting the development server...`));
  log("");
};

gulp.task("server", server);

/**
 * Lint all JavaScript, Sass and HTML.
 */

const lint = callback => {
  log.info(colour.green(`${icons.success} Linted`));
  callback();
};

gulp.task(
  "lint",
  gulp.parallel(gulp.parallel([lintStyles, lintScripts, lintMarkup]), lint)
);

/**
 * Compile all files.
 */

const compile = callback => {
  if (production) {
    log("");
    log.info(colour.green(`${icons.success} Production version built`));
  }
  callback();
};

gulp.task(
  "compile",
  gulp.series(
    "clean",
    gulp.parallel([
      "updateConfiguration",
      "compileMarkup",
      "compileStyles",
      "compileScripts",
      "compressAssets"
    ]),
    compile
  )
);

/**
 * Build all files for production.
 */

const build = callback => {
  production = true;
  callback();
};

gulp.task("build", gulp.series(build, "compile"));

/**
 * Create an archive of production build files.
 */

const compress = () => {
  log.info(colour.green(`${icons.success} Production build packaged`));

  gulp
    .src(paths.package)
    .pipe(plumber())
    .pipe(gulp.dest("../build/"));

  return gulp
    .src(paths.package)
    .pipe(plumber())
    .pipe(zip("build.zip"))
    .pipe(gulp.dest("../"));
};

gulp.task("compress", compress);

gulp.task("package", gulp.series(["cleanBuild", "build", "compress", "lint"]));

/**
 * Reload browser.
 */

const reload = callback => {
  browserSync.reload();
  callback();
};

/**
 * Stream changes to browser.
 */

const stream = callback => {
  browserSync.stream();
  callback();
};

/**
 * Watch source files & static assets for changes.
 */

const watch = () => {
  gulp.watch(
    `${paths.src}**/.htaccess`,
    gulp.series(updateConfiguration, reload)
  );
  gulp.watch(
    `${paths.src}**/*.{htaccess,txt}`,
    gulp.series(updateConfiguration, reload)
  );
  gulp.watch(`${paths.src}**/*.html`, gulp.series(compileMarkup, reload));
  gulp.watch(
    `${paths.src}stylesheets/**/*.scss`,
    gulp.series(compileStyles, stream)
  );
  gulp.watch(`${paths.src}scripts/**`, gulp.series(compileScripts, reload));
  gulp.watch(
    `${paths.src}assets/**`,
    gulp.series(cleanAssets, compressAssets, reload)
  );

  if (!production) {
    log.info(
      colour.yellow(
        `${icons.warn} Note that the development build is not optimised`
      )
    );
    log("");
  }
  log.info(colour.green(`${icons.success} Watching changes...`));
  log("");
};

gulp.task("watch", watch);

gulp.task("start", gulp.parallel("server", "watch", "compile"));
