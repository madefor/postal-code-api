"use strict";

const gulp = require("gulp");
const download = require("gulp-download");
const decompress = require("gulp-decompress");
const convertEncoding = require("gulp-convert-encoding");
const chmod = require("gulp-chmod");
const postal2json = require("./lib/postal2json.js");
const jigyosyo2json = require("./lib/jigyosyo2json.js");
const v1 = require("./lib/v1.js");

gulp.task("download", () => {
  const urls = [
    "http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip",
    "http://www.post.japanpost.jp/zipcode/dl/jigyosyo/zip/jigyosyo.zip",
  ];
  return download(urls)
    .pipe(decompress())
    .pipe(convertEncoding({ from: "shift_jis", to: "utf-8" }))
    .pipe(chmod(644))
    .pipe(gulp.dest("lib/api"));
});

/**
 * Create an API of the postal code.
 */
gulp.task(
  "v1",
  gulp.series("download", function () {
    return gulp
      .src("lib/api/KEN_ALL_ROME.CSV")
      .pipe(postal2json())
      .pipe(v1())
      .pipe(chmod(644))
      .pipe(gulp.dest("lib/api/v1"));
  })
);

/**
 * Create an API of the Jigyosyo postal code.
 */
gulp.task(
  "v1-jigyosyo",
  gulp.series("download", function () {
    return gulp
      .src("lib/api/JIGYOSYO.CSV")
      .pipe(jigyosyo2json())
      .pipe(v1())
      .pipe(chmod(644))
      .pipe(gulp.dest("lib/api/v1"));
  })
);

gulp.task("default", gulp.series(["v1", "v1-jigyosyo"]));
