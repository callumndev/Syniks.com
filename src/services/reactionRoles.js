module.exports = {
    async get( id ) {
        let reactionRoles = await syniks.db.reactStorage.findAll( { where: { gID: id } } );

        return await Promise.all( reactionRoles.map( async ( { dataValues } ) => {
            let { gID, mID, cID, rID } = dataValues;

            let bot = syniks.services.discord.bot;
            let g = bot.guilds.cache.get( gID );
            let c = bot.channels.cache.get( cID );
            let m = c ? await c.messages.fetch( mID ) : undefined;
            let r = g ? g.roles.cache.get( rID ) : undefined;

            return Object.assign( dataValues, { g, m, c, r } );
        } ) );
    },

    async set( id, newConfig ) {
        return await syniks.db.reactStorage.update( newConfig, { where: { id } } );
    },

    async count() {
        let reactionRoles = await syniks.db.reactStorage.findAll();

        return reactionRoles.length;
    }
};