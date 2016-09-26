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
 * Create an API of the postal code.
 */
gulp.task( 'v1', function () {
  var urls = [ 'http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip' ];
  return download( urls )
    .pipe( decompress() )
    .pipe( convertEncoding( { from: "shift_jis", to: "utf-8" } ) )
    .pipe( postal2json() )
    .pipe( v1() )
    .pipe( chmod( 644 ) )
    .pipe( gulp.dest( 'api/v1' ) );
} );

/**
 * Create an API of the Jigyosyo postal code.
 */
gulp.task( 'v1-jigyosyo', function () {
  var urls = [ 'http://www.post.japanpost.jp/zipcode/dl/jigyosyo/zip/jigyosyo.zip' ];
  return download( urls )
    .pipe( decompress() )
    .pipe( convertEncoding( { from: "shift_jis", to: "utf-8" } ) )
    .pipe( jigyosyo2json() )
    .pipe( v1() )
    .pipe( chmod( 644 ) )
    .pipe( gulp.dest( 'api/v1' ) );
} );

gulp.task( 'default', [ 'v1', 'v1-jigyosyo' ] );
