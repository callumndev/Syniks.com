process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.syniks = {
    NODE_ENV: process.env.NODE_ENV
};




// Modules
const express = require( 'express' ),
    _ = require( 'lodash' ),
    path = require( 'path' ),
    ejs = require( 'ejs' ),
    bodyParser = require( 'body-parser' ),
    fs = require( 'fs' )
    morgan = require( 'morgan' ),
    errorHandler = require( 'errorhandler' );

const settings    = require( path.join( __dirname, 'config-production.json' ) ),
    settingsDev = require( path.join( __dirname, 'config-development.json' ) );

syniks.settings = process.env.NODE_ENV == 'development' ?
    _.merge( settings, settingsDev ) :
    settings;


// Utils
syniks.util = require( './utils/requireDirFiles.js' )( path.join( __dirname, 'utils' ) );


// Services
//


// Routes
syniks.router = express.Router;
syniks.routes = syniks.util.requireDirFiles( path.join( __dirname, 'routes' ) );


// App
syniks.app = express();
syniks.port = process.env.PORT || 3000;

syniks.app.engine( '.html', ejs.__express );

syniks.app.set( 'views', path.join( __dirname, 'views' ) );
syniks.app.use( express.static( path.join( __dirname, 'public' ) ) );

syniks.app.use( bodyParser.json() );
syniks.app.set('view engine', 'html');


if ( syniks.NODE_ENV == 'development' ) {
    syniks.app.use( morgan('tiny', {
        skip: ( req, res ) => res.statusCode > 400
    } ) );
    syniks.app.use( morgan('combined', {
        skip: ( req, res ) => res.statusCode <= 400
    } ) );
};

for ( const [ name, router ] of Object.entries( syniks.routes ) ) {
    if ( typeof router != 'function' || typeof router.config != 'object' || router.config && router.config.enabled == false ) continue;

    router.config.path = router.config.path || '/';
    
    syniks.app.use( router.config.path, router );
};


syniks.app.get( '/404', ( req, res, next ) => {
    next();
} );

syniks.app.get( '/403', ( req, res, next ) => {
    let err = new Error( 'Forbidden!' );
    err.status = 403;

    next( err );
} );

syniks.app.get( '/500', ( req, res, next ) => {
    let err = new Error( 'keyboard cat!' );
    err.status = 500;

    next( err );
} );


syniks.app.use( ( req, res, next ) => {
    res.status( 404 );
    
    res.format( {
        html: () => {
            res.render( 'errors/404', { url: req.url } )
        },
        json: function () {
            res.json({ error: 'Not found' })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    } );
} );

syniks.app.use( ( err, req, res, next ) => {
    res.status( err.status || 500 );
    res.render( 'errors/500', { error: err } );
} );


// Listen
syniks.app.listen( syniks.port, () => console.log(`[Syniks] Ready on port ${ syniks.port }` ) );
