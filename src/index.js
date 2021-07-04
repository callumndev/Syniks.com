process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.syniks = {
    NODE_ENV: process.env.NODE_ENV,
    passport: require( 'passport' )
};




// Modules
const express = require( 'express' ),
    _ = require( 'lodash' ),
    path = require( 'path' ),
    ejs = require( 'ejs' ),
    bodyParser = require( 'body-parser' ),
    morgan = require( 'morgan' ),
    session  = require( 'express-session' ),
    SessionStore = require( 'express-session-sequelize' )( session.Store ),
    Strategy = require( 'passport-discord' ).Strategy,
    { Sequelize, DataTypes } = require( 'sequelize' );

const settings    = require( path.join( __dirname, 'config-production.json' ) ),
    settingsDev = require( path.join( __dirname, 'config-development.json' ) );

syniks.settings = process.env.NODE_ENV == 'development' ?
    _.merge( settings, settingsDev ) :
    settings;


// Utils
syniks.util = require( './utils/requireDirFiles.js' )( path.join( __dirname, 'utils' ) );

// DataBase
syniks.db = new Sequelize( syniks.settings.db.database, syniks.settings.db.username, syniks.settings.db.password, {
    host: syniks.settings.db.host,
    port: syniks.settings.db.port,
    dialect: syniks.settings.db.dialect,
    logging: false
} );

syniks.db.DataTypes = DataTypes;
syniks.db.sequelize = require( 'sequelize' );

for (const [ name, model ] of  Object.entries( syniks.util.requireDirFiles( path.join( __dirname, 'models' ) ) ) ) {
    syniks.db[ name ] = model

    syniks.db[ name ].sync();
};

syniks.db.sync()


// Services
//


// Routes
syniks.router = express.Router;
syniks.routes = syniks.util.requireDirFiles( path.join( __dirname, 'routes' ) );


// App
syniks.app = express();
syniks.port = process.env.PORT || 3000;

syniks.app.locals.NODE_ENV = syniks.NODE_ENV;
syniks.app.locals.version = syniks.settings.version;

syniks.app.engine( '.html', ejs.__express );

syniks.app.set( 'views', path.join( __dirname, 'views' ) );
syniks.app.use( express.static( path.join( __dirname, 'public' ) ) );

syniks.app.use( bodyParser.json() );
syniks.app.set( 'etag', false );
syniks.app.disable( 'view cache' );
syniks.app.set('view engine', 'html');


if ( syniks.NODE_ENV == 'development' ) {
    syniks.app.use( morgan('tiny', {
        skip: ( req, res ) => res.statusCode > 400
    } ) );

    syniks.app.use( morgan('combined', {
        skip: ( req, res ) => res.statusCode <= 400
    } ) );
};


// Passport
syniks.passport.serializeUser( ( user, done ) => done( null, user ) );
syniks.passport.deserializeUser( ( obj, done ) => done( null, obj ) );

syniks.passport.use( new Strategy( syniks.settings.auth, ( accessToken, refreshToken, profile, done ) => {
    process.nextTick( () => done( null, profile ) );
} ) );

syniks.app.use( session( {
    secret: syniks.settings.sessionSecret,
    store: new SessionStore( {
        db: syniks.db
    } ),
    resave: false,
    saveUninitialized: false
} ) );

syniks.app.use(syniks.passport.initialize());
syniks.app.use(syniks.passport.session());


// Routes
for ( const [ name, router ] of Object.entries( syniks.routes ) ) {
    if ( typeof router != 'function' || typeof router.config != 'object' || router.config && router.config.enabled == false ) continue;

    router.config.path = router.config.path || '/';
    
    syniks.app.use( router.config.path, router );
};


// Errors
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
            syniks.util.throwError( 404, req, res, { url: req.url } )
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
    syniks.util.throwError( 500, req, res, { error: err } )
} );


// Listen
syniks.app.listen( syniks.port, () => console.log(`[Syniks] Ready on port ${ syniks.port }` ) );
