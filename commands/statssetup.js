module.exports.run = async (Client, msg, args) => {
    Client.statchannelsGuilds.set(msg.guild.id, msg.guild.id);
    var everyone = msg.guild.defaultRole;
    var parentID;
    var ms;
    var bs;
    var tcs;
    var vcs;
    await msg.guild.createChannel('Server Stats', 'category').then(category => {
        parentID = category.id;
    });
    await msg.guild.createChannel('Members: ' + msg.guild.members.filter(m => !(m.user.bot)).size, 'voice').then(ms => {
        ms.setParent(parentID);
        ms.overwritePermissions(everyone, {JOIN: false});
        ms = msg.id;
    });
    await msg.guild.createChannel('Bots: ' + msg.guild.members.filter(m => m.user.bot).size, 'voice').then(bs => {
        bs.setParent(parentID);
        bs.overwritePermissions(everyone, {JOIN: false});
        bs = bs.id;
    });
    await msg.guild.createChannel('Text channels: ' + msg.guild.channels.filter(c => c.type == 'text').size, 'voice').then(tcs => {
        tcs.setParent(parentID);
        tcs.overwritePermissions(everyone, {JOIN: false});
        tcs = tcs.id;
    });
    await msg.guild.createChannel('Voice channels: ' + (msg.guild.channels.filter(c => c.type == 'voice').size - 3), 'voice').then(vcs => {
        vcs.setParent(parentID);
        vcs.overwritePermissions(everyone, {JOIN: false});
        vcs = vcs.id
    });
    Client.statchannels.set(msg.guild.id, { ms: ms, bs: bs, tcs: tcs, vcs: vcs });
}