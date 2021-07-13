const isImageURL = require( 'is-image-url' );

module.exports = async ( guild, body = {} ) => {
    let alerts = [],
        didChange = k => guild.config[ k ] != body[ k ];


    // // General
    // prefix:             { type: syniks.db.DataTypes.STRING, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.prefix },
    if ( body.prefix && didChange( 'prefix' ) && typeof body.prefix == 'string' ) {
        if ( body.prefix.length > 2 ) {
            alerts.push( 'Prefix cannot be longer than two characters' );
        } else {
            guild.config.prefix = body.prefix;
        };
    };

    // suggestionChannel:  syniks.db.DataTypes.STRING,
    if ( body.suggestionChannel && didChange( 'suggestionChannel' ) && typeof body.suggestionChannel == 'string' ) {
        if ( !guild.channels.cache.has( body.suggestionChannel ) && body.suggestionChannel != 'null' ) {
            alerts.push( 'Invalid suggestion channel ID provided' );
        } else if ( guild.channels.cache.get( body.suggestionChannel ) && guild.channels.cache.get( body.suggestionChannel ).type == 'text' || body.suggestionChannel == 'null' ) {
            guild.config.suggestionChannel = body.suggestionChannel == 'null' ? null : body.suggestionChannel;
        };
    };

    // autoRoles:          { type: syniks.db.DataTypes.JSON, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.autoRoles },
    if ( body.autoRoles && typeof body.autoRoles == 'object' ) {
        let missingRoles = guild.config.autoRoles.filter( r => !body.autoRoles.includes( r ) );

        if ( missingRoles.length > 0 ) {
            missingRoles.map( r => alerts.push( `Deleted auto role ${ guild.roles.cache.has( r ) ? guild.roles.cache.get( r ).name : r }` ) );
            
            guild.config.autoRoles = guild.config.autoRoles.filter( r => !missingRoles.includes( r ) );
        };
    };
    if ( body.addAutoRole && body.addAutoRole != 'null' && didChange( 'addAutoRole' ) && typeof body.addAutoRole == 'string' ) {
        if ( !guild.roles.cache.has( body.addAutoRole ) ) {
            alerts.push( 'Invalid auto role ID provided' );
        } else {
            guild.config.autoRoles.push( body.addAutoRole );
            alerts.push( `Added auto role ${ guild.roles.cache.get( body.addAutoRole ).name }` );
        };
    };


    // // Logs
    // modLogChannel:      syniks.db.DataTypes.STRING,
    if ( body.modLogChannel && didChange( 'modLogChannel' ) && typeof body.modLogChannel == 'string' ) {
        if ( !guild.channels.cache.has( body.modLogChannel ) && body.modLogChannel != 'null' ) {
            alerts.push( 'Invalid mod log channel ID provided' );
        } else if ( guild.channels.cache.get( body.modLogChannel ) && guild.channels.cache.get( body.modLogChannel ).type == 'text' || body.modLogChannel == 'null' ) {
            guild.config.modLogChannel = body.modLogChannel == 'null' ? null : body.modLogChannel;
        };
    };

    // eventLogChannel:    syniks.db.DataTypes.STRING,
    if ( body.eventLogChannel && didChange( 'eventLogChannel' ) && typeof body.eventLogChannel == 'string' ) {
        if ( !guild.channels.cache.has( body.eventLogChannel ) && body.eventLogChannel != 'null' ) {
            alerts.push( 'Invalid event log channel ID provided' );
        } else if ( guild.channels.cache.get( body.eventLogChannel ) && guild.channels.cache.get( body.eventLogChannel ).type == 'text' || body.eventLogChannel == 'null' ) {
            guild.config.eventLogChannel = body.eventLogChannel == 'null' ? null : body.eventLogChannel;
        };
    };


    // // VC
    // autoVC_Category:    syniks.db.DataTypes.STRING,
    if ( body.autoVC_Category && didChange( 'autoVC_Category' ) && typeof body.autoVC_Category == 'string' ) {
        if ( !guild.channels.cache.has( body.autoVC_Category ) && body.autoVC_Category != 'null' ) {
            alerts.push( 'Invalid auto VC category ID provided' );
        } else if ( guild.channels.cache.get( body.autoVC_Category ) && guild.channels.cache.get( body.autoVC_Category ).type == 'category' || body.autoVC_Category == 'null' ) {
            guild.config.autoVC_Category = body.autoVC_Category == 'null' ? null : body.autoVC_Category;
        };
    };

    // autoVC_Channel:     syniks.db.DataTypes.STRING,
    if ( body.autoVC_Channel && didChange( 'autoVC_Channel' ) && typeof body.autoVC_Channel == 'string' ) {
        if ( !guild.channels.cache.has( body.autoVC_Channel ) && body.autoVC_Channel != 'null' ) {
            alerts.push( 'Invalid auto VC channel ID provided' );
        } else if ( guild.channels.cache.get( body.autoVC_Channel ) && guild.channels.cache.get( body.autoVC_Channel ).type == 'voice' || body.autoVC_Channel == 'null' ) {
            guild.config.autoVC_Channel = body.autoVC_Channel == 'null' ? null : body.autoVC_Channel;
        };
    };


    // // Invites
    // inviteChannel:      syniks.db.DataTypes.STRING,
    if ( body.inviteChannel && didChange( 'inviteChannel' ) && typeof body.inviteChannel == 'string' ) {
        if ( !guild.channels.cache.has( body.inviteChannel ) && body.inviteChannel != 'null' ) {
            alerts.push( 'Invalid invite channel ID provided' );
        } else if (  guild.channels.cache.get( body.inviteChannel ) && guild.channels.cache.get( body.inviteChannel ).type == 'text' || body.inviteChannel == 'null' ) {
            guild.config.inviteChannel = body.inviteChannel == 'null' ? null : body.inviteChannel;
        };
    };

    // inviteImage:        syniks.db.DataTypes.STRING,
    if ( body.inviteImage != undefined && didChange( 'inviteImage' ) && typeof body.inviteImage == 'string' ) {
        if ( !isImageURL( body.inviteImage ) && body.inviteImage != '' ) {
            alerts.push( 'Invite image must be a valid image URL' );
        } else {
            guild.config.inviteImage = body.inviteImage == '' ? null : body.inviteImage;
        };
    };


    // // Server Stats
    // serverStatsEnabled: { type: syniks.db.DataTypes.BOOLEAN, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.serverStatsEnabled }
    if ( body.serverStatsEnabled && didChange( 'serverStatsEnabled' ) && typeof body.serverStatsEnabled == 'string' ) {
        if ( body.serverStatsEnabled != 'true' && body.serverStatsEnabled != 'false' ) {
            alerts.push( 'Invite server stats toggle' );
        } else {
            guild.config.serverStatsEnabled = body.serverStatsEnabled == 'true' ? true : false;
        };
    };


    // Update Config
    await syniks.services.config.set( guild.id, guild.config );


    // Return alerts & new config
    return {
        config: await syniks.services.config.get( guild.id ),
        alerts
    };
};