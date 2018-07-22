module.exports.run = async (Client, msg) => {
    var neededNumber = await Client.count.fetch(msg.channel.id);
    var lastUserID = await Client.count.fetch(msg.channel.id + "_lastAuthor");
    if (msg.content == neededNumber) {
        if (lastUserID != msg.author.id) {
            Client.count.add(msg.channel.id, 1);
            Client.count.set(msg.channel.id + "_lastAuthor", msg.author.id);
            msg.channel.setTopic("Last registered number: " + neededNumber);
        } else {
            msg.delete();
        }
    } else {
        msg.delete();
    }
}