'use strict';

var gulp = require( 'gulp' );
var download = require( 'gulp-download' );
var decompress = require( 'gulp-decompress' );
var convertEncoding = require( 'gulp-convert-encoding' );
var chmod = require( 'gulp-chmod' );
var postal2json = require( './lib/postal2json.js' );
var jigyosyo2json = require( './lib/jigyosyo2json.js' );
var v1 = require( './lib/v1.js' );

/**
 * Download and Decompress and Convert Encoding.
 */
function getZipCodeCSV( urls ) {
  return download( urls )
  .pipe( decompress() )
  .pipe( convertEncoding( { from: "shift_jis", to: "utf-8" } ) )
}

gulp.task( 'download', function () {
  return getZipCodeCSV( [
    'http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip',
    'http://www.post.japanpost.jp/zipcode/dl/jigyosyo/zip/jigyosyo.zip'
  ] )
  .pipe( chmod( 644 ) )
  .pipe( gulp.dest( 'api' ) );
} );

gulp.task( 'v1', function () {
  return getZipCodeCSV( [ 'http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip' ] )
  .pipe( postal2json() )
  .pipe( v1() )
  .pipe( chmod( 644 ) )
  .pipe( gulp.dest( 'api/v1' ) );
} );

gulp.task( 'v1-jigyosyo', function () {
  return getZipCodeCSV( [ 'http://www.post.japanpost.jp/zipcode/dl/jigyosyo/zip/jigyosyo.zip' ] )
  .pipe( jigyosyo2json() )
  .pipe( v1() )
  .pipe( chmod( 644 ) )
  .pipe( gulp.dest( 'api/v1' ) );
} );

gulp.task( 'default', [ 'v1', 'v1-jigyosyo' ] );
