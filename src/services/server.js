module.exports = {
    async get( id ) {
        let guild = syniks.services.discord.bot.guilds.cache.get( id );

        if ( guild ) {
            guild.config = await syniks.services.config.get( guild.id );
        };

        return guild;
    },

    set( id, newConfig ) {},

    count() {        
        return syniks.services.discord.bot.guilds.cache.size;
    }
};