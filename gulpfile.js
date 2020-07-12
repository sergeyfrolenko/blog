const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const concat = require("gulp-concat");
const uglify = require("gulp-uglifyjs");
const prettier = require("gulp-prettier");
const plumber = require("gulp-plumber");
// const browserSync = require('browser-sync');
gulp.task("sass", function (done) {
  gulp
    .src("dev/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(concat("style.css"))
    // .pipe(cssnano())
    .pipe(gulp.dest("public/stylesheets"));
  done();
});
gulp.task("js", function (done) {
  gulp
    .src([
      "dev/js/*.js",
      'dev/js/post.js',
      'node_modules/medium-editor/dist/js/medium-editor.min.js'
    ])
    .pipe(concat("script.js"))
    // .pipe(uglify())
    .pipe(gulp.dest("public/javascripts"));
  done();
});
gulp.task("pug", (done) => {
  gulp
    .src("dev/pug/*.pug")
    .pipe(pug())
    .pipe(prettier())
    .pipe(gulp.dest("dest"));
  done();
});
gulp.watch("dev/scss/**/*.scss", gulp.series("sass"));
gulp.watch("dev/js/*.js", gulp.series("js"));
gulp.watch("dev/pug/*.pug", gulp.series("pug"));

gulp.task("default", gulp.series("sass", "js", "pug"));
