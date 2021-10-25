module.exports = async bot => {
    function readyMessage( seperator, args ) {
        if ( typeof args != 'object') throw new TypeError( 'args must be typeof object' );

        function logArray( arr ) {
            return arr
                .map( ( l, i, arr ) => arr.indexOf( l ) == 0 ? l : `   ${ l }` )
                .join( '\n' );
        }

        args = args
            .map( arg => typeof arg == 'object' ? logArray( arg ) : arg )
            .join( `\n${ seperator }\n` );
        
        console.info( args );
    }

    readyMessage( '_____________________', [
        `[Syniks - Bot] ${ bot.user.tag } is online`,
        [
            'Bot:',
            `${ syniks.services.server.count() } guilds`,
            `${ bot.users.cache.size } users`
        ],
        [
            'DataBase:',
            `${ await syniks.services.config.count() } configs`
        ],
        ''
    ] );

    bot.emit( 'readyForApp' );
}


module.exports.config = {
    event: 'ready',
    disabled: false
}