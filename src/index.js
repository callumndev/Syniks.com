process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.syniks = {
    NODE_ENV: process.env.NODE_ENV,
    passport: require( 'passport' )
};


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
};

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
};


// Passport
syniks.passport.serializeUser( ( user, done ) => done( null, user ) );
syniks.passport.deserializeUser( ( obj, done ) => done( null, obj ) );

syniks.passport.use( new Strategy( syniks.settings.auth, ( accessToken, refreshToken, profile, done ) => {
    let avatarURL =  profile.avatar ? `https://cdn.discordapp.com/avatars/${ profile.id }/${ profile.avatar }` : 'https://discord.com/assets/f9bb9c4af2b9c32a2c5ee0014661546d.png';
    profile.avatar = `${ avatarURL }?size=4096`;
    profile.avatarSmall = `${ avatarURL }?size=256`;

    profile.refreshToken = refreshToken;
    profile.guilds = typeof profile.guilds == 'object' ? profile.guilds : [];

    delete profile.mfa_enabled;
    delete profile.locale;
    delete profile.verified;
    delete profile.flags;
    delete profile.premium_type;
    delete profile.public_flags;
    delete profile.provider;

    profile.guilds.map( async guild => {
        let iconURL =  guild.icon ? `https://cdn.discordapp.com/icons/${ guild.id }/${ guild.icon }` : 'https://discord.com/assets/f9bb9c4af2b9c32a2c5ee0014661546d.png';
        guild.icon = `${ iconURL }?size=4096`;
        guild.iconSmall = `${ iconURL }?size=256`;
        guild.inviteURL = `${ syniks.settings.botInvite }&guild_id=${ guild.id }&redirect_uri=${ encodeURIComponent( `${ syniks.settings.siteURL }/invited?redirect=/profile`) }`;

        delete guild.icon_hash;
        delete guild.splash;
        delete guild.discovery_splash;
        delete guild.region;
        delete guild.afk_channel_id;
        delete guild.afk_timeout;
        delete guild.widget_enabled;
        delete guild.widget_channel_id;
        delete guild.verification_level;
        delete guild.default_message_notifications;
        delete guild.explicit_content_filter;
        delete guild.roles;
        delete guild.emojis;
        delete guild.features;
        delete guild.mfa_level;
        delete guild.application_id;
        delete guild.system_channel_id;
        delete guild.system_channel_flags;
        delete guild.rules_channel_id;
        delete guild.large;
        delete guild.unavailable;
        delete guild.voice_states;
        delete guild.members;
        delete guild.channels;
        delete guild.threads;
        delete guild.presences;
        delete guild.max_presences;
        delete guild.max_members;
        delete guild.vanity_url_code;
        delete guild.description;
        delete guild.banner;
        delete guild.premium_tier;
        delete guild.premium_subscription_count;
        delete guild.preferred_locale;
        delete guild.public_updates_channel_id;
        delete guild.max_video_channel_users;
        delete guild.approximate_member_count;
        delete guild.approximate_presence_count;
        delete guild.welcome_screen;
        delete guild.nsfw_level;
        delete guild.stage_instances;
        delete guild.permissions_new;

        return guild;
    } );
        
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

syniks.app.use( syniks.passport.initialize() );
syniks.app.use( syniks.passport.session() );


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

syniks.app.use( ( err, req, res, next ) => {
    res.status( err.status || 500 );

    console.error( '500 Error:', err );

    let error = err.message.split( '\n\n' );
    error = {
        ...err,
        message: error[ error.length - 1 ]
    };

    syniks.util.throwError( 500, req, res, { error } )
} );


// Listen
function start() {
    syniks.app.listen( syniks.port, () => console.info(`[Syniks] Ready on port ${ syniks.port }` ) );
};

if ( syniks.services.discord.bot ) {
    syniks.services.discord.bot.on( 'readyForApp', () => start() );
} else {
    start()
};