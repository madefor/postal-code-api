'use strict';

var gulp = require( 'gulp' );
var download = require( 'gulp-download' );
var decompress = require( 'gulp-decompress' );
var convertEncoding = require( 'gulp-convert-encoding' );
var chmod = require( 'gulp-chmod' );
var postal2json = require( './lib/postal2json.js' );
var jigyosyo2json = require( './lib/jigyosyo2json.js' );
var v1 = require( './lib/v1.js' );

gulp.task( 'download', function () {
  var urls = [
    'https://www.post.japanpost.jp/zipcode/dl/roman/KEN_ALL_ROME.zip',
    'https://www.post.japanpost.jp/zipcode/dl/jigyosyo/zip/jigyosyo.zip'
  ];
  return download( urls )
    .pipe( decompress() )
    .pipe( convertEncoding( { from: "shift_jis", to: "utf-8" } ) )
    .pipe( chmod( 644 ) )
    .pipe( gulp.dest( 'api' ) );
} );

/**
 * Create an API of the postal code.
 */
gulp.task( 'v1', [ 'download' ], function () {
  gulp.src( 'api/KEN_ALL_ROME.CSV' )
    .pipe( postal2json() )
    .pipe( v1() )
    .pipe( chmod( 644 ) )
    .pipe( gulp.dest( 'api/v1' ) );
} );

/**
 * Create an API of the Jigyosyo postal code.
 */
gulp.task( 'v1-jigyosyo', ['download'], function () {
  gulp.src( 'api/JIGYOSYO.CSV' )
    .pipe( jigyosyo2json() )
    .pipe( v1() )
    .pipe( chmod( 644 ) )
    .pipe( gulp.dest( 'api/v1' ) );
} );

gulp.task( 'default', [ 'v1', 'v1-jigyosyo' ] );
