# Gulp / LESS / Jade / LiveReload boilerplate for web designers

[This is a fork of Gulp-boilerplate-for-web-designers by tsevdos](https://github.com/tsevdos/Gulp-boilerplate-for-web-designers) but I've included `gulp-connect` and LESS stylesheet support. The LiveReload just works and there's a built in server so just start coding. LiveReload browser extension is not needed.

**Gulp / LESS / Jade / LiveReload boilerplate for web designers** provides directory and file structure to aid web-designers kickstart their next project. It will help you develop and deploy any html-based (and more) templates. Some out of the box features :

- OOCSS and [SMACSS (Scalable and Modular Architecture for CSS)](http://smacss.com/) ready infrastructure
- Compile LESS files
- Autoprefix styles (you only need to write the web-standard version)
- Compiles and lints Coffee scripts files
- JsLinter
- CSS and JS minification
- Compiles Jade
- Image optimization
- Live-reload just works. Visit [http://localhost:8080/](http://localhost:8080/). All dev tasks are done before live-reload. All production / minifying / dist tasks are done after reload - valuable seconds when doing heavy development.
- Outputs all production code to `dist` folder. All development in `app` folder.

## Installation

Follow the [Getting Started with Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) for an in-depth look at setting up Gulp, but basically:

1. Boot up terminal
2. Make sure to have **[Node.js](http://nodejs.org/download/)** installed
3. Install **gulp globally** `npm install -g gulp`
4. `cd` to your project folder
5. Git clone (`git@github.com:tsevdos/Gulp-boilerplate-for-web-designers.git`) or download the zip from [https://github.com/tsevdos/Gulp-boilerplate-for-web-designers](https://github.com/tsevdos/Gulp-boilerplate-for-web-designers)
7. Install Gulp and required gulp tasks `npm install`
8a. Run `gulp` and enjoy
8b. To simply preview the latest production code in the browser, use `gulp serve-dist`. You would need to do a `gulp` or individual build tasks.

## File structure

Your **development environment** is in the **app directory** - you do all the work there. Whenever you are ready you can **build** the work by running the `gulp` task (the `default` task). This task will generate a **dist directory** that will contain all your files (CSS, JS, HTML and images) optimized and ready to distribute/upload/share.

## Tasks

You can run the below tasks.

1. `gulp` (default task) : Creates a `public` directory with all the optimized files (read **File structure** section for more details).
2. `gulp serve` : Probably the most usable task. Just run this task and work elegantly with live-reload and all the cool features listed above.
3. `gulp serve-dist` : Serves your `dist` production folder. LiveReload won't work as files here don't need to be watched. You should do your development in the `app` folder.
4. `gulp styles` : This task compiles all the Sass files and autoprefixes. After that it saves the generated CSS files expanded into the `development` directory and the minified version into the public directory.
5. `gulp coffee` : This task lints and compiles your coffee script files (you must include them into the `js` directory).
6. `gulp lintscripts` : This task lints all javascripts files except from those located under the `vendor` directory.
7. `gulp scripts` : This task will concatanate all scripts into one using the order you'll specify. The `public` version of this file will also be minified.
8. `gulp images` : This task will optimize all images (with `jpg`, `png` and `gif` extension) under the `img` folder.
9. `gulp jade` : This task will compile your jade templates.
10. `gulp markup` : This task will pretify your html files.
11. `gulp clean` : This support task cleans (deletes all the contents of) the `public` directory in order to prepare it for the `build` (default task).

## TODO:

- ECMAScript6 support. Soon!
