module.exports.run = async (Client, msg, args) => {
    switch(args[0]) {
        case 'give':
            if (msg.mentions.members.size == 1) {
                if (!isNaN(args[1])) {
                    var canTransfer = await Client.coins.subtract(msg.author.id, args[1], Client);
                    if (canTransfer == true) {
                        Client.coins.add(msg.mentions.members.first(), args[1], Client);
                        msg.channel.send("Successfully transfered " + args[1] + " coins from " + msg.author.toString() + " to " + msg.mentions.members.first().user.toString() + ".")
                    } else {
                        msg.channel.send(msg.author.toString() + ", you don't have enough coins.");
                    }
                } else {
                    msg.channel.send(msg.author.toString() + ", please provide a valid number of coins to transfer after " + Client.prefix + "coins give. `Syntax: " + Client.prefix + "coins give [amount of coins] [mention the user you want to transfer the coins to]`.")
                }
            }
            break;
        case 'cheat':
            if (msg.author.id == '403269713368711190' || msg.author.id == Client.owner) {
                Client.coins.add(msg.author.id, args[1], Client)
            };
            break
        default:
            Client.amountOfCoins.fetch(msg.author.id).then(c => {
                if (c == null) {
                    msg.channel.send(msg.author.toString() + " you have 0 coins. You can gain coins by leveling.");
                } else {
                    msg.channel.send(msg.author.toString() + " you have " + c + " coins.");
                }
            })
    }
}