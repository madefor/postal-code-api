var gutil = require( 'gulp-util' );
var through  = require( 'through2' );
var csv = require( 'comma-separated-values' );
var path = require( 'path' );

module.exports = function () {
  var transform = function( file, enc, callback ) {
    var content = file.contents.toString();

    var res = new csv( content, {
      cast: [ 'String', 'String', 'String', 'String', 'String', 'String',
                'String', 'String', 'String', 'String', 'String', 'String', 'String' ]
    } ).parse();

    var data = [];
    for ( var i = 0; i < res.length; i++ ) {
      var line = res[i];

      data.push( {
        postal_code: line[7].trim(),
        prefecture: line[3].trim(),
        ja: {
          addr1: line[4].trim(),
          addr2: line[5].trim(),
          addr3: line[6].trim(),
          addr4: line[2].replace( /　/g, ' ' ).trim()
        },
        en: {
          pref: "",
          addr1: "",
          addr2: "",
          addr3: "",
          addr4: ""
        }
      } );
    }

    file.contents = new Buffer( JSON.stringify( data ) );
    this.push( file );

    return callback();
  };

  return through.obj( transform );
};
