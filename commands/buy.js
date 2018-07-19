module.exports.run = async (Client, msg, args) => {
    const boughtColors = Client.boughtColors
    switch (args[0]) {
        case '1':
            console.log('1')
            var alreadyHas = await boughtColors.fetch(msg.author.id + '_turquoise')
            if (alreadyHas == 1) {
                boughtColors.fetch(msg.author.id + '_turquoise').then(c => console.log(c))
                msg.channel.send({embed: {
                    color: 0xe74c3c,
                    title: 'You already have this item!',
                    description: msg.member.displayName + ', you have already bought Turquoise!'
                }});
            } else {
                var canBuy = await Client.coins.subtract(msg.author.id, 20, Client)
                console.log(canBuy)
                if (canBuy == true) {
                    boughtColors.set(msg.author.id + '_turquoise', 1);
                    msg.channel.send({embed: {
                        color: 0x1abc9c,
                        title: 'Succesfully bought!',
                        description: 'Congratulations ' + msg.member.displayName + '! You just bought Turquoise for 20 Coins.'
                    }})
                } else {
                    msg.channel.send({embed: {
                        color: 0xe74c3c,
                        title: 'Not enough coins!',
                        description: msg.member.displayName + ', you do not have enough coins to buy Turquoise!'
                    }}); 
                }
            }
            break;
        case 'delete':
            if (boughtColors.fetch(msg.author.id + '_Turquoise')) {
                boughtColors.delete(msg.author.id + '_Turquoise');
                msg.channel.send('Yes')
            } else {
                msg.channel.send('No')
            }
            break;
        default:
            console.log('default')
        }
    }
