module.exports.run = (Client, msg, args) => {
    msg.channel.send({embed: {
        color: 0x3498db,
        title: 'Shop',
        description: 'You can buy colours for the embeds you can use with `rt!embed`. To buy things do `rt!buy [item number]`',
        fields: [{
            name: '**1**. Turquoise',
            value: 'Price: 20 Coins'
        },
        {
            name: '**2**. Red',
            value: 'Price: 10 Coins'
        },
        {
            name: '**3**. Green',
            value: 'Price: 10 Coins'
        },
        {
            name: '**4**. Orange',
            value: 'Price: 5 Coins'
        }
        ]
    }})
}