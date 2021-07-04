const user = syniks.router();

user.get( '/profile', syniks.util.auth.check, ( req, res ) => syniks.util.render( req, res, 'profile' ) );

module.exports = user;
module.exports.config = {
    path: '/',
    enabled: true
};