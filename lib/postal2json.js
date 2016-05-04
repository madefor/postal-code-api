var gutil = require( 'gulp-util' );
var through  = require( 'through2' );
var csv = require( 'comma-separated-values' );
var path = require( 'path' );

module.exports = function () {
  var transform = function( file, enc, callback ) {
    var content = file.contents.toString();

    var res = new csv( content, {
      cast: [ 'String', 'String', 'String', 'String', 'String', 'String', 'String' ]
    } ).parse();

    var data = [];
    for ( var i = 0; i < res.length; i++ ) {
      var line = res[i];

      // 前の行からの続きはスキップ
      if ( line[3].match(/、/) && ! line[3].match(/（/) ) {
        continue;
      } else if ( line[3].match(/）/) && ! line[3].match(/（/) ) {
        continue;
      } else if ( line[6].match(/\./) && ! line[6].match(/\(/) ) {
        continue;
      } else if ( line[6].match(/\)/) && ! line[6].match(/\(/) ) {
        continue;
      }

      data.push( {
        postal_code: line[0].trim(),
        prefecture: line[1].trim(),
        ja: {
          addr1: line[2].replace( /　/g, '' ).trim(),
          addr2: line[3].replace( /（.*/, '' ).replace( /　/g, '' )
              .replace( /.*場合$/, "" ).replace( /.*一円$/, "" ).trim(),
          addr3: "",
          addr4: ""
        },
        en: {
          pref: line[4].trim().replace( / .+$/, '' ).capitalize(),
          addr1: line[5].trim()
                  .replace( /^([A-Z]+) ([A-Z]+)$/, "$1-$2" )
                  .replace( /^([A-Z]+) ([A-Z]+) ([A-Z]+) ([A-Z]+)$/, "$3-$4, $1-$2" )
                  .capitalize(),
          addr2: line[6].replace( /.*baai$/i, "" ).replace( /\(.*/, '' )
                  .replace( /.*ichien$/i, "" )
                  .replace( /^([A-Z]+) ([A-Z]+)$/, "$2, $1" )
                  .trim().capitalize(),
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


String.prototype.capitalize = function(){
  var strs = this.toLowerCase().split( ' ' );
  for ( var i = 0; i < strs.length; i++ ) {
    strs[i] = strs[i].charAt(0).toUpperCase() + strs[i].slice(1);
  }
  return strs.join( ' ' );
}
