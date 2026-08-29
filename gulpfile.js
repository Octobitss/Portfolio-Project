import gulp from "gulp";
import * as dartSass from "sass";
import gulpSassFactory from "gulp-sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import plumber from "gulp-plumber";

const { src, dest, watch, series } = gulp;
const sass = gulpSassFactory(dartSass);

const paths = {
  scssEntry: "src/scss/main.scss",
  scssWatch: "src/scss/**/*.scss",
  output: "public/css",
};

function compileScss() {
  return src(paths.scssEntry)
    .pipe(plumber({ errorHandler: onSassError }))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(dest(paths.output))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest(paths.output));
}

function onSassError(err) {
  console.error("\n[sass] " + err.message + "\n");
  this.emit("end");
}

function watchScss(done) {
  compileScss();
  watch(paths.scssWatch, compileScss);
  done();
}

export const build = compileScss;
export { watchScss as watch };
export default compileScss;
