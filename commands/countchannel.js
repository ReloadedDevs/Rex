module.exports.run = async (Client, msg, args) => {
    var lastUserID = await Client.count.fetch(msg.channel.id + "_lastAuthor");
    if (msg.member.hasPermission('ADMINISTRATOR')) {
        msg.delete();
        await msg.channel.send({embed: {
            color: 0x3498db,
            title: "Count Channel",
            description: "This is a channel where you can count. Just add 1 to the last number that was sent. But you can only add 1 if the last number wasn't written by you."
        }}).then(infoMSG => infoMSG.pin());
        Client.count.set(msg.channel.id, 1);
        msg.channel.setTopic("Count Channel")
        if (lastUserID != null) {
            Client.count.delete(msg.channel.id + "_lastAuthor");
        }
    }
}