module.exports = ( req, res, next ) => {
    let id = req.user ? req.user.id : null;
    let isSiteAdmin = syniks.util.auth.isSiteAdmin( id );

    if ( !isSiteAdmin ) {
        res.status( 403 ).render( 'errors/403' );
    } else {
        next();
    };
};