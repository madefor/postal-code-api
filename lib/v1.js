var gutil = require( 'gulp-util' );
var through  = require( 'through2' );
var path = require( 'path' );
var prefs = require( './prefs.json' );

module.exports = function () {
  var transform = function( file, enc, callback ) {
    var content = file.contents.toString();
    var res = JSON.parse( content );

    var postal_codes = {};
    for ( var i = 0; i < res.length; i++ ) {
      var line = res[i];

      if ( ! prefs[line.prefecture] ) {
        console.log( line.prefecture );
        process.exit(1);
      }

      var data = {
        prefcode: prefs[line.prefecture],
        ja: {
          prefecture: line.prefecture,
          address1: line.ja.addr1,
          address2: line.ja.addr2,
          address3: line.ja.addr3,
          address4: line.ja.addr4
        },
        en: {
          prefecture: line.en.pref,
          address1: line.en.addr1,
          address2: line.en.addr2,
          address3: line.en.addr3,
          address4: line.en.addr4
        }
      };

      if ( postal_codes[line.postal_code] ) {
        postal_codes[line.postal_code].data.push( data );
      } else {
        postal_codes[line.postal_code] = {
          code: line.postal_code,
          data: [data]
        };
      }
    }

    for ( var p in postal_codes ) {
      var file = new gutil.File( {
        cwd: __dirname,
        path: path.join( __dirname, p.replace( /^([0-9]{3}).*/, '$1' ),
                  p.replace( /.*([0-9]{4})$/, '$1' ) + '.json' ),
        contents: new Buffer( JSON.stringify( postal_codes[p] ) + "\n" )
      } );

      this.push( file );
    }

    return callback();
  };

  return through.obj( transform );
};
