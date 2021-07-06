const SyniksClient = require( './lib/structures/Client.js' ),
    path = require( 'path' );

const bot = new SyniksClient( {
    eventsPath: path.join( __dirname, 'events' )
} );

bot.login( syniks.settings.bot.token );


module.exports = bot;