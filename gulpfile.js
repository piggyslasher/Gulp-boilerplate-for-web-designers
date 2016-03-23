"use strict";

/*
Grunt installation:
-------------------
npm install -g gulp
npm install --save-dev gulp gulp-util

Project Dependencies:
---------------------
npm install gulp --save-dev

Simple Dependency Install:
--------------------------
npm install (from the same root directory as the `package.json` file)

*/

var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var jade = require('gulp-jade');
var prettify = require('gulp-html-prettify');
var sass = require('gulp-ruby-sass');
var path = require('path');
var connect = require('gulp-connect');
var debug = require('gulp-debug');
var console = require('better-console');


var paths = {
	app: './app',
	dest: './dist'
};

// Loads plugins 
// var gulpLoadPlugins = require("gulp-load-plugins");
// var plugins = gulpLoadPlugins();

gulp.task('styles', function () {
	return sass([
			paths.app + '/scss/**/*.scss',
			'!' + paths.app + '/scss/**/_*.scss'
		], {
			compass : true,
			style : 'expanded'
		})
		.pipe(autoprefixer({
			browsers: [
				'> 1%',
				'last 2 versions',
				'firefox >= 4',
				'safari 7',
				'safari 8',
				'IE 8',
				'IE 9',
				'IE 10',
				'IE 11'
			],
			cascade: false
		}))
		.pipe(gulp.dest(paths.app + '/css'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest(paths.dest + '/css'));
});

gulp.task('coffee', function() {
	return gulp.src(paths.app + '/js/**/*.coffee')
		.pipe(coffeelint())
		.pipe(coffee({
			bare: true
		}))
		.pipe(connect.reload())
		.pipe(debug({
			title: '*.coffee files changed:'
		}))
		.pipe(gulp.dest(paths.app + '/js'));
});

gulp.task('lintscripts', ['coffee'], function() {
	return gulp.src([
			'gulpfile.js',
			paths.app + '/js/**/*.js',
			'!' + paths.app + '/js/vendor/*'
		])
		.pipe(debug({
			title: 'linted:'
		}))
		.pipe(jshint('.jshintrc')) // Edit the .jshintrc file to change the options
		.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['coffee', 'lintscripts'], function() {
	return gulp.src([
			// setup script sequence
			paths.app + '/js/coffee.js'
		])
		.pipe(concat('main.js'))
		.pipe(gulp.dest(paths.app + '/js'))
		.pipe(connect.reload())
		.pipe(debug({
			title: 'javascript processed:'
		}))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.dest + '/js'));
});

gulp.task('images', function() {
	return gulp.src([
			paths.app + '/img/**/*.png',
			paths.app + '/img/**/*.jpg',
			paths.app + '/img/**/*.gif'
		])
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(connect.reload())
		.pipe(debug({
			title: 'images processed:'
		}))
		.pipe(gulp.dest(paths.dest + '/img'));
});

gulp.task('jade', function() {
	return gulp.src(paths.app + '/**/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(debug({
			title: 'jaded:'
		}))
		.pipe(gulp.dest(paths.app));
});

gulp.task('markup', ['jade'], function() {
	return gulp.src(paths.app + '/**/*.html')
		.pipe(prettify({
			indent_char: ' ',
			indent_size: 2
		}))
		.pipe(connect.reload())
		.pipe(debug({
			title: 'markup files changed:'
		}))
		.pipe(gulp.dest(paths.dest));
});

gulp.task('clean', function() {
	return gulp.src(paths.dest + '/', {
			read: false
		})
		.pipe(clean());
});

gulp.task('default', ['clean'], function() {
	gulp.run('markup', 'styles', 'scripts', 'images', 'connect');
});

gulp.task('watch', function(){
	// Watch html files
	gulp.watch(paths.app + '/**/*.html', function() {
		gulp.run('markup');
	});

	// Watch .less files
	gulp.watch([
		paths.app + '/less/**/*.less',
		paths.app + '/css/**/*.css',
	], function() {
		console.log('stylesheet changed');
		gulp.run('styles');
	});

	// Watch .js files
	gulp.watch([
		paths.app + '/js/**/*.js',
		paths.app + '/js/**/*.coffee',
	], function() {
		console.log('js files changed');
		gulp.run('scripts');
	});

	// Watch images
	gulp.watch(paths.app + '/img/**/*', function() {
		gulp.run('images');
	});

	gulp.watch([
		// paths.app + '/**/*.html',
		paths.app + '/**/*.jade'
	], function() {
		gulp.run('markup');
	});
});

gulp.task('connect', ['watch'], function() {
	connect.server({
		root: paths.app,
		livereload: true
	});
});

gulp.task('serve-dist', function() {
	connect.server({
		root: paths.dest,
		port: 8001,
		livereload: true
	});
});
