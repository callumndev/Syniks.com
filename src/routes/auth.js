const auth = syniks.router();

auth.get( '/', ( req, res ) => res.redirect( '/' ) );

auth.get( '/login', ( req, res ) => res.send( 'some login api' ) );

auth.get( '/logout', ( req, res ) => res.send( 'some logout api' ) );
module.exports = auth;
module.exports.config = {
    path: '/auth',
    enabled: true
};