const main = syniks.router();

main.get( '/', ( req, res ) => res.render( 'index' ) );

main.get( '/invite', ( req, res ) => res.redirect( syniks.settings.botInvite ) );

main.get( '/support', ( req, res ) => res.redirect( syniks.settings.supportServer ) );

module.exports = main;
module.exports.config = {
    path: '/',
    enabled: true
};