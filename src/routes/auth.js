const auth = syniks.router();

auth.get( '/', ( req, res ) => res.redirect( '/' ) );

auth.get( '/callback', syniks.passport.authenticate('discord', {
    failureRedirect: syniks.settings.auth.failureRedirect
} ), ( req, res ) => res.redirect( syniks.settings.auth.successRedirect ) );

auth.get( '/login', syniks.passport.authenticate( 'discord', {
    scope: syniks.settings.auth.scopes,
    prompt: syniks.settings.auth.prompt
} ) );

auth.get( '/logout', ( req, res ) => {
    req.session.destroy( () => {
        req.logout();

        res.redirect( syniks.settings.auth.logoutRedirect );
    } );
} );


module.exports = auth;
module.exports.config = {
    path: '/auth',
    enabled: true
}