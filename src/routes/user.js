const user = syniks.router();

user.get( '/profile', syniks.util.auth.check, ( req, res ) => {
    let { Permissions } = require( 'discord.js' );

    syniks.util.render( req, res, 'profile', { permissions: Permissions } );
} );


module.exports = user;
module.exports.config = {
    path: '/',
    enabled: true
};