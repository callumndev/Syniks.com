module.exports = ( code, req, res, opts ) => {
    res.status( code );

    syniks.util.render( req, res, `errors/${ code }`, opts );
}