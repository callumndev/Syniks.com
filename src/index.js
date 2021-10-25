process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.syniks = {
    NODE_ENV: process.env.NODE_ENV,
    passport: require( 'passport' )
}


process.on( 'unhandledRejection', err => console.error( '[unhandledRejection err]: ', err ) );




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

const settings    = require( path.join( __dirname, 'config-production.json' ) );

syniks.settings = process.env.NODE_ENV == 'development' ?
    _.merge( settings, require( path.join( __dirname, 'config-development.json' ) ) ) :
    settings;


// Utils
syniks.util = require( './utils/requireDirFiles.js' )( path.join( __dirname, 'utils' ) );

// DataBase
syniks.db = new Sequelize( syniks.settings.db.database, syniks.settings.db.username, syniks.settings.db.password, {
    host: syniks.settings.db.host,
    port: syniks.settings.db.port,
    dialect: syniks.settings.db.dialect,
    logging: syniks.settings.db.logging,
    define: {
        freezeTableName: syniks.settings.db.freezeTableName
    }
} );

syniks.db.DataTypes = DataTypes;
syniks.db.sequelize = require( 'sequelize' );

for (const [ name, model ] of Object.entries( syniks.util.requireDirFiles( path.join( __dirname, 'models' ) ) ) ) {
    syniks.db[ name ] = model

    syniks.db[ name ].sync();
}

syniks.db.sync()


// Services
syniks.services = syniks.util.requireDirFiles( path.join( __dirname, 'services' ) );


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
syniks.app.use( bodyParser.urlencoded( {
    extended: true
} ) );
syniks.app.set( 'etag', false );
syniks.app.disable( 'view cache' );
syniks.app.set( 'view engine', 'html' );


if ( syniks.NODE_ENV == 'development' ) {
    syniks.app.use( morgan( 'tiny', {
        skip: ( req, res ) => res.statusCode > 400
    } ) );

    syniks.app.use( morgan( 'combined', {
        skip: ( req, res ) => res.statusCode <= 400
    } ) );
}


// Passport
syniks.passport.serializeUser( ( user, done ) => done( null, user ) );
syniks.passport.deserializeUser( ( obj, done ) => done( null, obj ) );

syniks.passport.use( new Strategy( syniks.settings.auth, ( accessToken, refreshToken, profile, done ) => {
    const user = {
        ..._.pick(profile, [ 'id', 'username', 'avatar', 'discriminator', 'guilds', 'fetchedAt' ]),
        avatarHash: profile.avatar,

        get avatar() {
            return this.avatarHash
                ? `https://cdn.discordapp.com/avatars/${this.id}/${this.avatarHash}?size=4096`
                : syniks.settings.backupIcon;
        },

        guilds: (profile.guilds || []).map(({ id, name, icon, permissions }) => {
            return {
                id, name, permissions,
                
                get icon() {
                    return icon
                        ? `https://cdn.discordapp.com/icons/${id}/${icon}?size=4096`
                        : syniks.settings.backupIcon
                },

                get inviteURL() {
                    const invURL = new syniks.util.buildURL()
                        .url('https://discord.com')
                        .base('/api/oauth2/authorize')
                        .param('client_id', '739777124256448534')
                        .param('permissions', 8)
                        .param('scope', 'bot')
                        .param('guild_id', '123')
                        .param('redirect_uri',
                            new syniks.util.buildURL()
                            .url('http://localhost:3000')
                            .base('/invited')
                        , false);
                    
                    return invURL.toString()
                }
            }
        })
    }
    
    return done( null, user )
} ) );

syniks.app.use( session( {
    secret: syniks.settings.sessionSecret,
    store: new SessionStore( {
        db: syniks.db
    } ),
    resave: false,
    saveUninitialized: false
} ) );

syniks.app.use( syniks.passport.initialize() );
syniks.app.use( syniks.passport.session() );


// Routes
// eslint-disable-next-line no-unused-vars
for ( const [ name, router ] of Object.entries( syniks.routes ) ) {
    if ( typeof router != 'function' || typeof router.config != 'object' || router.config && router.config.enabled == false ) continue;

    router.config.path = router.config.path || '/';
    
    syniks.app.use( router.config.path, router );
}


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


// eslint-disable-next-line no-unused-vars
syniks.app.use( ( req, res, next ) => {
    res.status( 404 );
    
    res.format( {
        html: () => {
            syniks.util.throwError( 404, req, res )
        },
        json: () => {
            res.json( { error: '404 Not found' } );
        },
        default: () => {
            res.type( 'txt' ).send( '404 Not found' );
        }
    } );
} );

// eslint-disable-next-line no-unused-vars
syniks.app.use( ( err, req, res, next ) => {
    res.status( err.status || 500 );

    console.error( '500 Error:', err );

    let error = err.message.split( '\n\n' );
    error = {
        ...err,
        message: error[ error.length - 1 ]
    }

    syniks.util.throwError( 500, req, res, { error } )
} );


// Listen
function start() {
    syniks.app.listen( syniks.port, () => console.info(`[Syniks] Ready on port ${ syniks.port }` ) );
}

const bot = syniks.services.discord.bot;
if ( bot ) {
    bot.on( 'readyForApp', () => start() );
} else {
    start()
}