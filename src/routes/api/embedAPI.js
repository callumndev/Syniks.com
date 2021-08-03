const embed = syniks.router();

embed.post( '/fetch', syniks.util.auth.check, async (req, res) => {
    let body = req.body || {},
        channel = body.channel,
        id = body.id,
        embed,
        bot = syniks.services.discord.bot;

    channel = bot.channels.cache.get(channel);
    if (channel) {
        try {
            let message = await channel.messages.fetch(id);
            if(message) {
                let msgEmbed = message.embeds[0];
                if (msgEmbed) {
                    embed = msgEmbed;
                };
            };
        } catch (error) {
            
        };
    };
    
    res.status(!embed ? 404 : 200).send(embed);
} );


module.exports = embed;
module.exports.config = {
    path: '/api/embed',
    enabled: true
};