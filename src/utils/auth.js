module.exports = {
    isSiteAdmin: id => syniks.settings.siteAdmins.includes( id ),
    
    check: ( req, res, next ) => {
        if ( !req.isAuthenticated() ) {
            res.status( 403 ).redirect( '/auth/login' );
        } else {
            next();
        };
    }
};