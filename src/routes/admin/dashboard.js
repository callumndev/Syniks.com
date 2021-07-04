const admin = syniks.router();

admin.get( '/', ( req, res ) => res.send( 'admin' ) );

admin.get( '/auth', syniks.util.checkSiteAdmin, ( req, res ) => res.send( 'admin authed' ) );


module.exports = admin;
module.exports.config = {
    path: '/admin',
    enabled: true
};