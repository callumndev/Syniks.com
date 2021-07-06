module.exports = async bot => {
    function log( seperator, args ) {
        if ( typeof args != 'object') throw new TypeError( 'args must be typeof object' );

        function logArray( arr ) {
            return arr
                .map( ( l, i, arr ) => arr.indexOf( l ) == 0 ? l : `   ${ l }` )
                .join( '\n' );
        };

        args = args
            .map( arg => typeof arg == 'object' ? logArray( arg ) : arg )
            .join( `\n${ seperator }\n` );
        
        console.log( args );
    };

    log( '_____________________', [
        `[Syniks - Bot] ${ bot.user.tag } is online`,
        [
            'Bot:',
            `${ bot.guilds.cache.size } guilds`,
            `${ bot.users.cache.size } users`
        ],
        [
            'DataBase:',
            `${ ( await syniks.db.config.findAll() ).length } configs`
        ]
    ] );
};


module.exports.config = {
    event: 'ready',
    disabled: false
};