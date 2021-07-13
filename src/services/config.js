module.exports = {
    async get( id ) {
        let [ config, created ] = await syniks.db.config.findOrCreate( { where: { id } } );

        return config.dataValues;
    },

    async set( id, newConfig ) {
        return await syniks.db.config.update( newConfig, { where: { id } } );
    },

    async count() {
        let configs = await syniks.db.config.findAll();

        return configs.length;
    }
};