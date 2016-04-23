'use strict';

var gulp = require( 'gulp' );
var download = require( 'gulp-download' );
var decompress = require( 'gulp-decompress' );
var convertEncoding = require( 'gulp-convert-encoding' );
var chmod = require( 'gulp-chmod' );
var v1 = require( './lib/v1.js' );

gulp.task( 'download', function () {
  return download( [
    'http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip',
  ] )
  .pipe( decompress() )
  .pipe( convertEncoding( { from: "shift_jis", to: "utf-8" } ) )
  .pipe( chmod( 644 ) )
  .pipe( gulp.dest( 'api' ) );
} );

gulp.task( 'v1', function () {
  return download( [
    'http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip',
  ] )
  .pipe( decompress() )
  .pipe( convertEncoding( { from: "shift_jis", to: "utf-8" } ) )
  .pipe( v1() )
  .pipe( chmod( 644 ) )
  .pipe( gulp.dest( 'api/v1' ) );
} );

gulp.task( 'default', [ 'v1' ] );
