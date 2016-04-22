'use strict';

var gulp = require( 'gulp' );
var download = require( 'gulp-download' );
var decompress = require( 'gulp-decompress' );
var convertEncoding = require( 'gulp-convert-encoding' );
var chmod = require( 'gulp-chmod' );
var p2j = require( './lib/glup-p2j.js' );

gulp.task( 'default', function () {
  return download( [
    'http://www.post.japanpost.jp/zipcode/dl/roman/ken_all_rome.zip',
  ] )
  .pipe( decompress() )
  .pipe( convertEncoding( { from: "shift_jis", to: "utf-8" } ) )
  .pipe( p2j() )
  .pipe( chmod( 644 ) )
  .pipe( gulp.dest( function( args ) {
    return 'api/v1';
  } ) );
} );
