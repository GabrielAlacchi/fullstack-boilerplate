/**
 * Created by gabriel on 9/13/16.
 */

var DEBUG = process.env.NODE_ENV != 'production';

var gulp = require('gulp');
var imageMin = require('gulp-imagemin');
var webpack = require('webpack-stream');
var scss = require('gulp-sass');
var browserSync = require('browser-sync').create();

const src = {
  "js": "./web/src/**/*.js",
  "scss": "./web/scss/**/*.scss",
  "images": "./web/images/**/*",
  "html": "./web/pages/**/*.html"
};

const dest = {
  "js": "./build/src",
  "scss": "./build/css",
  "images": "./build",
  "html": "./build"
};

function onError(error) {
  console.error(error);
  this.end();
}

gulp.task('bundle', function () {
  return gulp.src(src.js)
    .pipe(webpack( require('./webpack.config.js') ))
    .on('error', onError)
    .pipe(gulp.dest(dest.js))
    .pipe(browserSync.stream())
    .on('error', onError);
});

gulp.task('style', function() {
  return gulp.src(src.scss)
    .pipe(scss({
      outputStyle: DEBUG ? 'expanded' : 'compressed'
    })).on('error', scss.logError)
    .pipe(gulp.dest(dest.scss));
});

gulp.task('images', function () {
  return gulp.src(src.images)
    .pipe(imageMin())
    .on('error', onError)
    .pipe(gulp.dest(dest.images))
    .pipe(browserSync.stream())
    .on('error', onError);
});

gulp.task('html', function() {
  return gulp.src(src.html)
    .pipe(gulp.dest(dest.html));
});

gulp.task('default', ['style', 'bundle', 'images', 'html']);
