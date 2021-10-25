module.exports = {
    async get( guild ) {
        // eslint-disable-next-line no-unused-vars
        let [ lockdownConfig, created ] = await syniks.db.lockdownConfig.findOrCreate( { where: { guild } } );
        
        return lockdownConfig.roles;
    },

    async set( guild, newConfig ) {
        return await syniks.db.lockdownConfig.update( newConfig, { where: { guild } } );
    },

    async count() {
        let reactionRoles = await syniks.db.lockdownConfig.findAll();

        return reactionRoles.length;
    }
}