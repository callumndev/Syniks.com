module.exports = {
    async get( id ) {
        let guild = syniks.services.discord.bot.guilds.cache.get( id );

        if ( guild ) {
            guild.config = await syniks.services.config.get( guild.id );
            guild.reactionRoles = await syniks.services.reactionRoles.get( guild.id );
            guild.lockdownRoles = await syniks.services.lockdownRoles.get( guild.id );
        }

        return guild;
    },

    count() {        
        return syniks.services.discord.bot.guilds.cache.size;
    }
}