const cooldown = new Set()
module.exports = {

    run(msg, xp, level, Client) {
        if (!(msg.author.bot) && msg.channel.type == 'text' && !(cooldown.has(msg.author.id))) {
            if (xp.fetch(`${msg.guild.id}_${msg.author.id}`)) {
                cooldown.add(msg.author.id);
                Client.setTimeout(() => {
                    cooldown.delete(msg.author.id)
                }, 30000);
                xp.add(`${msg.guild.id}_${msg.author.id}`, 1);
            
                var neededXP = null;
                level.fetch(`${msg.guild.id}_${msg.author.id}`).then(l => {
                    neededXP = (l + 1) * 100;
                
                    var currentXP = null;
                    xp.fetch(`${msg.guild.id}_${msg.author.id}`).then(xp => {
                        currentXP = xp;
                    
                        if ((neededXP == currentXP) || (currentXP > neededXP)) {
                            level.add(`${msg.guild.id}_${msg.author.id}`, 1);
                            var amountOfCoins = level * 10
                            coins.add(msg.author.id, amountOfCoins);
                            level.fetch(`${msg.guild.id}_${msg.author.id}`).then(level => {
                                msg.channel.send(msg.author.toString() + ', GG! :smiley: You leveled up! :tada: New level: **' + level + '**').then(levelMsg => {
                                    levelMsg.delete(15000);
                                });
                            });
                        };
                    });
                });
            } else {
                xp.set(`${msg.guild.id}_${msg.author.id}`, 1);
                level.set(`${msg.guild.id}_${msg.author.id}`, 0)
            };
        };
    }

}