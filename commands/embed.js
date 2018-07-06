var colors = {
    grey: 0x95a5a6,
    blue: 0x3498db,
    red: 0xe74c3c,
    orange: 0xe67e22,
    turquoise: 0x1abc9c,
    green: 0x2ecc71
}
module.exports.run = (Client, msg, args) => {
    if (args.split(' ').slice(0) in colors) {
        
    }
    msg.channel.createWebhook(msg.member.displayName, msg.author.displayAvatar).then(wh => {
        
        wh.send({embed: {
            
        }})
    })
}