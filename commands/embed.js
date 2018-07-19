var colors = {
    grey: 0x95a5a6,
    blue: 0x3498db,
    red: 0xe74c3c,
    orange: 0xe67e22,
    turquoise: 0x1abc9c,
    green: 0x2ecc71
}
module.exports.run = (Client, msg, args) => {
    msg.delete();
    if (args) {
        var wantedColor = args[0];
        args.shift();
        var content = args.join(' ');
        if (wantedColor in colors) {
            Client.boughtColors.fetch(msg.author.id + '_' + wantedColor).then(hasColor => {
                if (hasColor != null) {
                    msg.channel.createWebhook(msg.member.displayName, msg.author.displayAvatarURL).then(async wh => {
                        await wh.send('',{embeds: [{
                            color: colors[wantedColor],
                            description: content
                        }]});
                        wh.delete();
                    });
                } else {
                    msg.channel.send(msg.author.toString() + ", you don't own this color.").then(errmsg => errmsg.delete(10000));
                }
            })
        } else {
            msg.channel.send(msg.author.toString() + ", you did not enter a valid color.").then(errmsg => errmsg.delete(10000));
        }
    }
}