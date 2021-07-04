const fs = require( 'fs' ),
    path = require( 'path' );

function read( dir ) {
    let filesAndDirs = fs.readdirSync( dir ),
        files = filesAndDirs.filter( file => !fs.lstatSync( path.join( dir, file ) ).isDirectory() ),
        dirs = filesAndDirs.filter( file => fs.lstatSync( path.join( dir, file ) ).isDirectory() ),
        _files = {};
            
    dirs.forEach( directory => {        
        for ( const [ k, v ] of Object.entries( read( path.join( dir, directory ) ) ) ) {
            _files[ k ] = v;
        };
    } );

    files.forEach( file => _files[ file.split( '.' )[ 0 ] ] = require( path.join( dir, file ) ) );

    return _files;
};

module.exports = read;