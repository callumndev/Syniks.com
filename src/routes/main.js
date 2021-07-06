const main = syniks.router();

main.get( '/', ( req, res ) => syniks.util.render( req, res, 'index' ) );

main.get( '/invite', ( req, res ) => res.redirect( syniks.settings.botInvite ) );

main.get( '/support', ( req, res ) => res.redirect( syniks.settings.supportServer ) );


module.exports = main;
module.exports.config = {
    path: '/',
    enabled: true
};