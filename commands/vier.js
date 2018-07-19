function newTable(x,c) {
    console.log(x + '_1');
    if (!(x + '_1')) {
        if (c == 'red') {
            var coin = '🔴';
        } else {
            var coin = '🔵';
        }
        var nTable = `
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
${coin}:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:one::two::three::four::five::six::seven:
`
        return nTable;
    }
}
module.exports.run = (Client, msg, args) => {
    if (msg.mentions.users.size == 1) {
        //Players
        var creator = msg.author.id;
        var opponent = msg.mentions.users.first();
        //Send game table
        msg.channel.send(`
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:white_circle::white_circle::white_circle::white_circle::white_circle::white_circle::white_circle:
:one::two::three::four::five::six::seven:`)
        .then(async table => {
            //reactions
            await table.react('1⃣');
            await table.react('2⃣');
            await table.react('3⃣');
            await table.react('4⃣');
            await table.react('5⃣');
            await table.react('6⃣');
            await table.react('7⃣');
            //reaction await
            var currentPlayer = creator;
            const filter = (reaction, user) => (reaction.emoji.name === '1⃣' || reaction.emoji.name === '2⃣' || reaction.emoji.name === '3⃣' || reaction.emoji.name === '4⃣' || reaction.emoji.name === '5⃣' || reaction.emoji.name === '6⃣' || reaction.emoji.name === '7⃣') && user.id === currentPlayer;
            table.awaitReactions(filter, { max: 1, time: 60000 }).then(r => {
                if (r.size == 1) {
                    console.log(r.first().emoji.name)
                    switch (r.first().emoji.name) {
                        case '1⃣':
                            if (currentPlayer == creator) {
                                var tableToEdit = newTable('1', 'blue');
                            } else {
                                var tableToEdit = newTable('1', 'red');
                            }
                            console.log(tableToEdit);
                            table.edit(tableToEdit);
                            break;
                    }
                }
            })
        })
    }
}