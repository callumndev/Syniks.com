module.exports = ( req, res, template, data = {} ) => {
    let isAuthenticated = req.isAuthenticated();

    const baseData = {
        isAuthenticated: isAuthenticated,
        user: isAuthenticated ? req.user : null,
        bot: syniks.services.discord.bot,

        url: req.url,

        moment: require( 'moment' ),
        
        ...data
    };

    res.render( template, baseData );
};