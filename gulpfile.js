var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass")(require("sass"));
var concat = require("gulp-concat");

function sync() {
  browserSync.init({
    server: "./",
    open: false,
  });
}

function watching() {
  gulp.watch("app/css/scss/**/*.scss", gulp.series("sass"));
  gulp.watch(["app/js/**/*.js", "!app/js/scripts.js"], gulp.series("js"));
  gulp.watch("./**/*.html").on("change", browserSync.reload);
}

function compileSass() {
  return gulp
    .src("app/css/scss/*.scss")
    .pipe(sass())
    .pipe(concat("styles.css"))
    .pipe(gulp.dest("app/css"))
    .pipe(browserSync.stream());
}

function compileJS() {
  return gulp
    .src(["app/js/**/*.js", "!app/js/scripts.js"])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("app/js/"))
    .pipe(browserSync.stream());
}
// Static Server + watching scss/html files
gulp.task("sync", sync);
gulp.task("watch", watching);
// Compile sass into CSS & auto-inject into browsers
gulp.task("sass", compileSass);
gulp.task("js", compileJS);

gulp.task("default", gulp.parallel(["sync", "sass", "js", "watch"]));
