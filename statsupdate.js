module.exports.run = (Client) => {
    Client.setInterval(function() {
        Client.statchannelsGuilds.fetchAll().then(guilds => {
            guilds.forEach(guild => {
                Client.statchannels.fetch(guild, { target: '.ms' }).then(ms => ms.setName('Member: ' + msg.guild.members.filter(m => !(m.user.bot)).size));
                Client.statchannels.fetch(guild, { target: '.bs' }).then(bs => bs.setName('Bots: ' + msg.guild.members.filter(m => m.user.bot).size));
                Client.statchannels.fetch(guild, { target: '.tcs' }).then(tcs => tcs.setName('Text channels: ' + msg.guild.channels.filter(c => c.type == 'text').size));
                Client.statchannels.fetch(guild, { target: '.vcs' }).then(vcs => vcs.setName('Voice channels: ' + (msg.guild.channels.filter(c => c.type == 'voice').size - 3)));
            });
        })
    }, 30);
}