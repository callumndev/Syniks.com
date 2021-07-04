module.exports = ( req, res, next ) => {
    let id = req.user ? req.user.id : null;
    let isSiteAdmin = syniks.util.auth.isSiteAdmin( id );

    if ( !isSiteAdmin ) {
        syniks.util.throwError( 403, req, res );
    } else {
        next();
    };
};