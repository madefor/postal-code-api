'use strict';

var gulp = require( 'gulp' );
var download = require( 'gulp-download' );
var decompress = require( 'gulp-decompress' );
var convertEncoding = require( 'gulp-convert-encoding' );
var chmod = require( 'gulp-chmod' );
var v1 = require( './lib/v1.js' );

/**
 * Download and Decompress and Convert Encoding.
 */
function getZipCodeCSV() {
  return download( [
    'http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip',
  ] )
  .pipe( decompress() )
  .pipe( convertEncoding( { from: "shift_jis", to: "utf-8" } ) )
}

gulp.task( 'download', function () {
  return getZipCodeCSV()
  .pipe( chmod( 644 ) )
  .pipe( gulp.dest( 'api' ) );
} );

gulp.task( 'v1', function () {
  return getZipCodeCSV()
  .pipe( v1() )
  .pipe( chmod( 644 ) )
  .pipe( gulp.dest( 'api/v1' ) );
} );

gulp.task( 'default', [ 'v1' ] );
