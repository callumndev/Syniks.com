const fs = require( 'fs' ),
    path = require( 'path' );

module.exports = dir => fs.readdirSync( dir )
    .filter( file => !fs.lstatSync( path.join( dir, file ) ).isDirectory() )
        .map( file => ( { name: file.split( '.' )[ 0 ], util: require( path.join( dir, file ) ) } ) );