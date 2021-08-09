module.exports = {
    async get( guild ) {
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
};