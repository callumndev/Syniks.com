module.exports = ( req, res, template, data = {} ) => {
    let isAuthenticated = req.isAuthenticated();

    const baseData = {
        isAuthenticated: isAuthenticated,
        user: isAuthenticated ? req.user : null,
        
        ...data
    };

    res.render( template, baseData );
};