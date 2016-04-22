var gutil = require( 'gulp-util' );
var through  = require( 'through2' );
var csv = require( 'comma-separated-values' );
var path = require( 'path' );
var prefs = require( './prefs.json' );

module.exports = function () {
  var transform = function( file, enc, callback ) {
    var content = file.contents.toString();

    var res = new csv( content, {
      cast: [ 'String', 'String', 'String', 'String', 'String', 'String', 'String' ]
    } ).parse();

    for ( var i = 0; i < res.length; i++ ) {
      var line = res[i];
      if ( ! prefs[line[1].trim()] ) {
        console.log( line[1].trim() );
        process.exit(1);
      }
      var data = {
        zipcode: line[0].toString().trim(),
        prefcode: prefs[line[1]],
        ja: {
          prefecture: line[1].trim(),
          address1: line[2].replace( '　', '' ).trim(),
          address2: line[3].replace( /（.*/, '' ).replace( '　', '' ).trim()
        },
        en: {
          prefecture: line[4].trim(),
          address1: line[5].trim(),
          address2: line[6].replace( / \(.*/, '' ).trim()
        }
      };

      var file = new gutil.File( {
        cwd: __dirname,
        path: path.join( __dirname, line[0].replace( /^([0-9]{3}).*/, '$1' ),
                  line[0].replace( /.*([0-9]{4})$/, '$1' ) + '.json' ),
        contents: new Buffer( JSON.stringify( data ) + "\n" )
      } );

      this.push( file );
    }

    return callback();
  };

  return through.obj( transform );
};
