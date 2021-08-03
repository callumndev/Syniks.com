const isImageURL = require( 'is-image-url' ),
    { MessageEmbed } = require( 'discord.js' );

function validURL( str ) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    
    return !!pattern.test( str );
};


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

    // disabledEvents:     { type: syniks.db.DataTypes.JSON, allowNull: false, defaultValue: syniks.settings.modelDefaults.config.disabledEvents },
    for (const [ key, value ] of Object.entries( body ) ) {
        let eventRegEx = /\bevent(.*?)Enabled\b/;
        if ( eventRegEx.test( key ) && value && typeof value == 'string' ) {
            let eventName = eventRegEx.exec( key )[ 1 ];
            if ( !eventName || !syniks.settings.events.includes( eventName ) || ( value != 'true' && value != 'false' ) ) {
                alerts.push( 'Invite event log' );
            } else {
                if ( value == 'true' ) {
                    guild.config.disabledEvents = guild.config.disabledEvents.filter( event => event.toLowerCase() != eventName.toLowerCase() );
                } else {
                    if ( !guild.config.disabledEvents.includes( eventName ) ) {
                        guild.config.disabledEvents.push( eventName );
                    };
                };
            };
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

    // // Levelling
    // levelMessageChannel: syniks.db.DataTypes.STRING
    if ( body.levelMessageChannel && didChange( 'levelMessageChannel' ) && typeof body.levelMessageChannel == 'string' ) {
        if ( !guild.channels.cache.has( body.levelMessageChannel ) && body.levelMessageChannel != 'null' ) {
            alerts.push( 'Invalid level message channel ID provided' );
        } else if ( guild.channels.cache.get( body.levelMessageChannel ) && guild.channels.cache.get( body.levelMessageChannel ).type == 'text' || body.levelMessageChannel == 'null' ) {
            guild.config.levelMessageChannel = body.levelMessageChannel == 'null' ? null : body.levelMessageChannel;
        };
    };


    // Update Config
    await syniks.services.config.set( guild.id, guild.config );


    // Message Embedder
    if ( body.embedChannel && typeof body.embedChannel == 'string' ) {
        if ( !guild.channels.cache.has( body.embedChannel ) ) {
            alerts.push( 'Invalid embed channel provided' );
        } else if ( guild.channels.cache.get( body.embedChannel ) && guild.channels.cache.get( body.embedChannel ).type == 'text' ) {
            let embedChannel = guild.channels.cache.get( body.embedChannel ),
                embed = new MessageEmbed();

            if ( body.title != undefined && typeof body.title == 'string' ) {
                if ( !body.title ) {
                    alerts.push( 'Embed title must not be invalid' );
                } else if ( body.title.length > 256 ) {
                    alerts.push( 'Embed title cannot be longer than 256 characters' );
                } else {
                    try {
                        embed.setTitle( body.title );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };
            
            if ( body.description && typeof body.description == 'string' ) {
                if ( body.description.length > 4096 ) {
                    alerts.push( 'Embed description cannot be longer than 4096 characters' );
                } else {
                    try {
                        embed.setDescription( body.description );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            if ( body.url && typeof body.url == 'string' ) {
                if ( !validURL( body.url ) ) {
                    alerts.push( 'Embed URL needs to be a valid URL' );
                } else {
                    try {
                        embed.setURL( body.url );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            if ( body.color && typeof body.color == 'string' ) {
                if ( !body.color.startsWith( '#' ) ) {
                    alerts.push( 'Embed color needs to be a valid color' );
                } else {
                    try {
                        embed.setColor( body.color );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            if ( body.icon && typeof body.icon == 'string' ) {
                if ( !isImageURL( body.icon ) ) {
                    alerts.push( 'Embed icon needs to be a valid image URL' );
                } else {
                    try {
                        embed.setThumbnail( body.icon );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            let author = {};

            if ( body.author_name && typeof body.author_name == 'string' ) {
                if ( body.author_name.length > 256 ) {
                    alerts.push( 'Embed author name cannot be longer than 256 characters' );
                } else {
                    author.name = body.author_name;
                };
            };

            if ( body.author_icon && typeof body.author_icon == 'string' ) {
                if ( !isImageURL( body.author_icon ) ) {
                    alerts.push( 'Embed author icon needs to be a valid URL' );
                } else {
                    author.icon = body.author_icon;
                };
            };

            if ( body.author_url && typeof body.author_url == 'string' ) {
                if ( !validURL( body.author_url ) ) {
                    alerts.push( 'Embed author URL needs to be a valid URL' );
                } else {
                    author.url = body.author_url;
                };
            };

            try {
                embed.author = embed.author || {};

                if ( author.name ) {
                    embed.author.name = author.name;
                };
                
                if ( author.icon ) {
                    embed.author.iconURL = author.icon;
                };

                if ( author.url ) {
                    embed.author.url = author.url;
                };
            } catch ( e ) {
                alerts.push( e.message );
            };

            if ( body.footer && typeof body.footer == 'string' ) {
                if ( body.footer.length > 2048 ) {
                    alerts.push( 'Embed footer cannot be longer than 2048 characters' );
                } else {
                    try {
                        embed.setFooter( body.footer );                        
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            let fields = Object.keys( body ).filter( k => k.startsWith( 'field-' ) );
            for ( let i = 0; i < fields.length; i++ ) {
                let fieldName = body[ `field-${ i }-name` ],
                    fieldValue = body[ `field-${ i }-value` ],
                    fieldInline = body[ `field-${ i }-inline` ];

                if ( fieldName && fieldValue ) {
                    try {
                        embed.addField( fieldName, fieldValue, fieldInline == 'on' );
                    } catch ( e ) {
                        alerts.push( e.message );
                    }
                };
            };

            try {
                embedChannel.send( embed );
            } catch ( e ) {
                alerts.push( e.message );
            }
        };
    };
    
    
    // Message Embed Editor
    if ( body.messageFetchChannel && typeof body.messageFetchChannel == 'string' ) {
        if ( !guild.channels.cache.has( body.messageFetchChannel ) ) {
            alerts.push( 'Invalid embed channel provided' );
        } else if ( guild.channels.cache.get( body.messageFetchChannel ) && guild.channels.cache.get( body.messageFetchChannel ).type == 'text' ) {
            let messageFetchChannel = guild.channels.cache.get( body.messageFetchChannel ),
                messageFetchID,
                embed = new MessageEmbed();

            try {
                messageFetchID = await messageFetchChannel.messages.fetch(body.messageFetchID);
                if(!messageFetchID) {
                    throw new Error();
                };
            } catch (error) {
                alerts.push( 'Invalid message ID provided' );
            };

            if ( body.editTitle != undefined && typeof body.editTitle == 'string' ) {
                if ( !body.editTitle ) {
                    alerts.push( 'Embed title must not be invalid' );
                } else if ( body.editTitle.length > 256 ) {
                    alerts.push( 'Embed title cannot be longer than 256 characters' );
                } else {
                    try {
                        embed.setTitle( body.editTitle );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };
            
            if ( body.editDescription && typeof body.editDescription == 'string' ) {
                if ( body.editDescription.length > 4096 ) {
                    alerts.push( 'Embed description cannot be longer than 4096 characters' );
                } else {
                    try {
                        embed.setDescription( body.editDescription );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            if ( body.editUrl && typeof body.editUrl == 'string' ) {
                if ( !validURL( body.editUrl ) ) {
                    alerts.push( 'Embed URL needs to be a valid URL' );
                } else {
                    try {
                        embed.setURL( body.editUrl );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            if ( body.editColor && typeof body.editColor == 'string' ) {
                if ( !body.editColor.startsWith( '#' ) ) {
                    alerts.push( 'Embed color needs to be a valid color' );
                } else {
                    try {
                        embed.setColor( body.editColor );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            if ( body.editIcon && typeof body.editIcon == 'string' ) {
                if ( !isImageURL( body.editIcon ) ) {
                    alerts.push( 'Embed icon needs to be a valid image URL' );
                } else {
                    try {
                        embed.setThumbnail( body.editIcon );
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            let author = {};

            if ( body.edit_author_name && typeof body.edit_author_name == 'string' ) {
                if ( body.edit_author_name.length > 256 ) {
                    alerts.push( 'Embed author name cannot be longer than 256 characters' );
                } else {
                    author.name = body.edit_author_name;
                };
            };

            if ( body.edit_author_icon && typeof body.edit_author_icon == 'string' ) {
                if ( !isImageURL( body.edit_author_icon ) ) {
                    alerts.push( 'Embed author icon needs to be a valid URL' );
                } else {
                    author.icon = body.edit_author_icon;
                };
            };

            if ( body.edit_author_url && typeof body.edit_author_url == 'string' ) {
                if ( !validURL( body.edit_author_url ) ) {
                    alerts.push( 'Embed author URL needs to be a valid URL' );
                } else {
                    author.url = body.edit_author_url;
                };
            };

            try {
                embed.author = embed.author || {};

                if ( author.name ) {
                    embed.author.name = author.name;
                };
                
                if ( author.icon ) {
                    embed.author.iconURL = author.icon;
                };

                if ( author.url ) {
                    embed.author.url = author.url;
                };
            } catch ( e ) {
                alerts.push( e.message );
            };

            if ( body.editFooter && typeof body.editFooter == 'string' ) {
                if ( body.editFooter.length > 2048 ) {
                    alerts.push( 'Embed footer cannot be longer than 2048 characters' );
                } else {
                    try {
                        embed.setFooter( body.editFooter );                        
                    } catch ( e ) {
                        alerts.push( e.message );
                    };
                };
            };

            let fields = Object.keys( body ).filter( k => k.startsWith( 'field-' ) && k.endsWith( '-edit' ) );
            for ( let i = 0; i < fields.length; i++ ) {
                let fieldName = body[ `field-${ i }-name-edit` ],
                    fieldValue = body[ `field-${ i }-value-edit` ],
                    fieldInline = body[ `field-${ i }-inline-edit` ];

                if ( fieldName && fieldValue ) {
                    try {
                        embed.addField( fieldName, fieldValue, fieldInline == 'on' );
                    } catch ( e ) {
                        alerts.push( e.message );
                    }
                };
            };

            try {
                if(messageFetchID) {
                    messageFetchID.edit( embed );
                };
            } catch ( e ) {
                alerts.push( e.message );
            }
        };
    };
    
    
    // Return alerts & new config
    return {
        config: await syniks.services.config.get( guild.id ),
        alerts
    };
};