module.exports.run = (Client, msg, args) => {
    msg.channel.send({embed: {
        color: 0xe74c3c,
        title: 'Help',
        description: ' Hey this is the help of Rex. Could be possible that some bugs occure, because we had no time to test it.',
        fields: [
            {
                name: Client.prefix + 'vote',
                value: 'Starts an interavtive vote setup with up to five options to vote for. Please exactly follow the steps given there.'
            },
            {
                name: Client.prefix + 'statssetup',
                value: 'Creates some voice channels that show some stats about the server. They regulary update.'
            },
            {
                name: Client.prefix + 'shop',
                value: 'Gives you information about what you can buy. You can buy them with coins. To get coins just be active, you get coins when you level up.'
            },
            {
                name: Client.prefix + 'buy',
                value: 'You can buy with ' + Client.prefix + 'buy [number of product] . You can find all numbers in shop command.'
            },
            {
                name: Client.prefix + 'coins',
                value: 'Shows you how many coins you have.'
            },
            {
                name: Client.prefix + 'embed',
                value: 'Lets you write in embeds. Usage: `' + Client.prefix + ' [color] [text] . You can only use colors you have bought in shop.'
            },
            {
                name : Client.prefix + 'countchannel',
                value: 'You need admin for that. With this command you can set the count channel where you can play the count game. You see how the game works once you have set up the channel.'
            }
        ]
    }})
}