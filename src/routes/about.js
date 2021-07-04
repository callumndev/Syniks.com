const about = syniks.router();

about.get( '/', ( req, res ) => res.redirect( '/' ) );

about.get( '/privacy', ( req, res ) => res.send( 'some privacy content' ) );

about.get( '/terms', ( req, res ) => res.send( 'some terms content' ) );

module.exports = about;
module.exports.config = {
    path: '/about',
    enabled: true
};