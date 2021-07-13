const dashboard = syniks.router();

dashboard.get( '/', syniks.util.auth.check, ( req, res ) => res.redirect( '/profile' ) );

dashboard.get( '/:guildID', syniks.util.auth.check, async ( req, res ) => {
    // Guild
    const guild = await syniks.services.server.get( req.params.guildID );
    if ( !guild ) return syniks.util.throwError( 404, req, res, { url: `/${ req.params.guildID }`, info: 'Unknown server' } );


    // Member
    let member = guild.members.cache.get( req.user.id );
    if ( !member ) {
        try {
            await guild.members.fetch();

            member = guild.members.cache.get( req.user.id );
        } catch ( e ) {
            console.log( `[Error] [Guild: ${ guild.name } ${ guild.id }] Error fetching member ${ req.user.id }: ${ e.message }` );
        };
    };

    if ( !member || !member.permissions.has( 'MANAGE_GUILD' ) ) return syniks.util.throwError( 403, req, res );


    // Config
    guild.icon = req.user.guilds.filter( g => g.id == guild.id )[ 0 ].icon;


    // Render
    syniks.util.render( req, res, 'dashboard.html', { guild } )
} );

dashboard.post( '/:guildID', syniks.util.auth.check, async ( req, res ) => {
    // Guild
    const guild = await syniks.services.server.get( req.params.guildID );
    if ( !guild ) return syniks.util.throwError( 404, req, res, { url: `/${ req.params.guildID }`, info: 'Unknown server' } );


    // Member
    let member = guild.members.cache.get( req.user.id );
    if ( !member ) {
        try {
            await guild.members.fetch();

            member = guild.members.cache.get( req.user.id );
        } catch ( e ) {
            console.log( `[Error] [Guild: ${ guild.name } ${ guild.id }] Error fetching member ${ req.user.id }: ${ e.message }` );
        };
    };

    if ( !member || !member.permissions.has( 'MANAGE_GUILD' ) ) return syniks.util.throwError( 403, req, res );


    // Config
    guild.icon = req.user.guilds.filter( g => g.id == guild.id )[ 0 ].icon;


    // Update Config
    let { alerts, config } = await syniks.util.updateConfig( guild, req.body );
    guild.config = config;
    

    // Render
    syniks.util.render( req, res, 'dashboard.html', { guild, alerts } )
} );


module.exports = dashboard;
module.exports.config = {
    path: '/dashboard',
    enabled: true
};