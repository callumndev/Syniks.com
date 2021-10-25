const fs = require( 'fs' ),
    path = require( 'path' );

function read( dir ) {
    let filesAndDirs = fs.readdirSync( dir ),
        files = filesAndDirs.filter( file => !fs.lstatSync( path.join( dir, file ) ).isDirectory() ),
        dirs = filesAndDirs.filter( file => fs.lstatSync( path.join( dir, file ) ).isDirectory() ),
        _files = [];
            
    dirs.forEach( directory => {
        // eslint-disable-next-line no-unused-vars
        for ( const [ k, v ] of Object.entries( read( path.join( dir, directory ) ) ) ) {
            _files.push( { name: v.name, util: v.util } );
        }
    } );

    files.forEach( file => _files.push( { name: file.split( '.' )[ 0 ], util: require( path.join( dir, file ) ) } ) );

    return _files;
}

module.exports = read;