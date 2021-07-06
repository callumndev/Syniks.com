const { Client } = require( 'discord.js' ),
    events = require( './events.js' );


module.exports = class SyniksClient extends Client {
    constructor( { eventsPath } ) {
        super();
        
        this.events = new events( this, { eventsPath } );
    };
};