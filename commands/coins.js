module.exports.run = (Client, msg, args) => {
    switch(args[0]) {
        case 'give':
            Client.coins.add(msg.author.id, 9999, Client);
        case 'subtract':
            Client.coins.subtract(msg.author.id, 9999, Client);
    }
}