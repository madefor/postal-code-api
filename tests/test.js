const csv = require( 'comma-separated-values' );
const fs = require( 'fs' )
const path = require( 'path' )

fs.readFile( 'api/KEN_ALL_ROME.CSV', 'utf8', ( err, data ) => {
  if (err) throw err;

  const res = new csv( data, {
    cast: [ 'String', 'String', 'String', 'String', 'String', 'String', 'String' ]
  } ).parse();

  for ( var i = 0; i < res.length; i++ ) {
    const p = res[i][0].trim()
    fs.statSync( path.join( 'api', 'v1',
          p.replace( /^([0-9]{3}).*/, '$1' ),
              p.replace( /.*([0-9]{4})$/, '$1' ) + '.json' ) )
  }
});
