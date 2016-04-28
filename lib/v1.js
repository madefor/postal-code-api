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

    var postal_codes = {};
    for ( var i = 0; i < res.length; i++ ) {
      var line = res[i];
      if ( ! prefs[line[1].trim()] ) {
        console.log( line[1].trim() );
        process.exit(1);
      }

      var data = {
        ja: {
          prefecture: line[1].trim(),
          address1: line[2].replace( '　', '' ).trim(),
          address2: line[3].replace( /（.*/, '' ).replace( '　', '' )
              .replace( /以下に掲載がない場合/, "" ).trim()
        },
        en: {
          prefecture: line[4].trim().replace( / .+$/, '' ).capitalize(),
          address1: line[5].trim()
                .replace( /^([A-Z]+) ([A-Z]+)$/, "$1-$2" )
                .replace( /^([A-Z]+) ([A-Z]+) ([A-Z]+) ([A-Z]+)$/, "$3-$4, $1-$2" )
                .capitalize(),
          address2: line[6].replace( /ikanikeisaiganaibaai/i, "" ).replace( / \(.*/, '' )
                .trim().capitalize()
        }
      };

      if ( postal_codes[line[0].toString().trim()] ) {
        postal_codes[line[0].toString().trim()].address.push( data );
      } else {
        postal_codes[line[0].toString().trim()] = {
          code: line[0].toString().trim(),
          prefcode: prefs[line[1]],
          address: [data]
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


String.prototype.capitalize = function(){
  var strs = this.toLowerCase().split( ' ' );
  for ( var i = 0; i < strs.length; i++ ) {
    strs[i] = strs[i].charAt(0).toUpperCase() + strs[i].slice(1);
  }
  return strs.join( ' ' );
}
