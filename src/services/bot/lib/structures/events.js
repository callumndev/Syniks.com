const { EventEmitter } = require( 'events' ),
    fs = require( 'fs' ),
    path = require( 'path' );

module.exports = class events extends EventEmitter {
    constructor( client, { eventsPath } ) {
        super();

        this.client = client;
        this.events = new Map();
        
        this.on( 'set', this.handleEvent );

        fs.readdirSync( path.join( eventsPath ) )
            .forEach( event => this.set( event, require( path.join( eventsPath, event ) ) ) );
    }

    handleEvent( event ) {
        this.client.on( event.config.event, ( ...args ) => event( ...args, this.client ) );
    }


    get( event ) {
        return this.events.get( event );
    }

    set( name, event ) {
        if ( typeof event != 'function' ) throw new Error( 'Event needs to be typeof object' );
        if ( typeof event.config != 'object' ) throw new Error( 'Even config needs to be typeof object' );

        if ( typeof event.config.disabled != 'boolean' ) throw new Error( 'Event disabled needs to be typeof boolean' );
        if ( event.config.disabled == true ) return false;
        
        if ( typeof event.config.event != 'string' ) throw new Error( 'Event name needs to be typeof string' );

        this.events.set( name, event );
        this.emit( 'set', event );

        return;
    }


    isEnabled( name ) {
        const event = this.get( name );
        if ( !event ) throw new Error( `Event ${ name } not found` );

        return !event.config.disabled;
    }

    isDisabled( name ) {
        const event = this.get( name );
        if ( !event ) throw new Error( `Event ${ name } not found` );

        return event.config.disabled;
    }

    enable( name ) {
        const event = this.get( name );
        if ( !event ) throw new Error( `Event ${ name } not found` );

        if ( event.config.disabled == false )
            throw new Error( `Event ${ name } is already enabled` );
        
        event.config.disabled = false;

        try {
            this.set( name, event );
        } catch ( e ) {
            throw new Error( e );
        }
    }

    disable( name ) {
        const event = this.get( name );
        if ( !event ) throw new Error( `Event ${ name } not found` );

        if ( event.config.disabled == true )
            throw new Error( `Event ${ name } is already disabled` );

        event.config.disabled 
    }
}