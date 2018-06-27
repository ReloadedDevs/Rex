module.exports = {
    checkPermissions(msg) {
        if(!msg.guild.me.permissionsIn(msg.channel).has("SEND_MESSAGES")) {
            return false;
        }

        if(!msg.guild.me.permissionsIn(msg.channel).has("USE_EXTERNAL_EMOJIS")) {
            msg.channel.send(":x: I am not allowed to use external emojis in this channel! Please check my permissions!");
            return false;
        }

        if(!msg.guild.me.permissionsIn(msg.channel).has("EMBED_LINKS")) {
            msg.channel.send(":x: I am not allowed to send links into this channel! Please check my permissions!");
            return false;
        }

        if(!msg.guild.me.permissionsIn(msg.channel).has("ADD_REACTIONS")) {
            msg.channel.send(":x: I am not allowed to add reactions to messages! Please check my permissions!");
            return false;
        }

        return true;
    },
}