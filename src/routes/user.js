const user = syniks.router();

user.get( '/profile', syniks.util.auth.check, ( req, res ) => {
    let { Permissions } = require( 'discord.js' ),
    moment = require( 'moment' );

    syniks.util.render( req, res, 'profile', { permissions: Permissions, moment } );
} );


module.exports = user;
module.exports.config = {
    path: '/',
    enabled: true
};