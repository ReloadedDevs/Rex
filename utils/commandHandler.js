module.exports.run = (Client, msg) => {
    if(msg.channel.type == "text" && msg.content.startsWith(Client.prefix) || msg.content.startsWith('<@'+Client.user.id+'>') || msg.content.startsWith('<@!'+Client.user.id+'>')) {
        if(Client.functions.checkPermissions(msg) == false) return;

        if(msg.isMemberMentioned(msg.guild.me)) return Client.functions.createEmbed(msg.channel, texts.general_mentioned_text + " **`" + Client.prefix + "`**", texts.general_mentioned_title);

        var invoke = msg.content.split(' ')[0].substr(Client.prefix.length);
        var args   = msg.content.split(' ').slice(1);
    
        var cmd = Client.commands.get(invoke);

        if(cmd) {
            cmd.run(Client, msg, args, true);
        }
    }
}