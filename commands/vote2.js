const Discord = require('discord.js');
const help = "`!vote [ab|abc|abcd|abcde|12|123|1234|12345|daumen|check] question...`";

// eslint-disable-next-line max-params
exports.run = function(client, message, args, command, argresult) {
    if(message.channel.type != "text") return;
    if(!args[0]) {
        message.reply(help);
        return;
    }
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.member.displayName, "https://cdn.discordapp.com/avatars/" + message.author.id + "/" + message.author.avatar + ".png")
    .setColor(0xF1C40F)
    .setTitle("**Question**")
    .setDescription(argresult.substring(args[0].length + 1));
    switch (args[0].toLowerCase()) {
        case "ab":
            message.channel.send({ embed })
            .then(reply => react(reply, ["🇦", "🇧"]))
            .catch(error => console.error(error));
            break;
        case "abc":
            message.channel.send({ embed })
            .then(reply => react(reply, ["🇦", "🇧", "🇨"]))
            .catch(error => console.error(error));
            break;
        case "abcd":
            message.channel.send({ embed })
            .then(reply => react(reply, ["🇦", "🇧", "🇨", "🇩"]))
            .catch(error => console.error(error));
            break;
        case "abcde":
            message.channel.send({ embed })
            .then(reply => react(reply, ["🇦", "🇧", "🇨", "🇩", "🇪"]))
            .catch(error => console.error(error));
            break;
        case "12":
            message.channel.send({ embed })
            .then(reply => react(reply, ["1⃣", "2⃣"]))
            .catch(error => console.error(error));
            break;
        case "123":
            message.channel.send({ embed })
            .then(reply => react(reply, ["1⃣", "2⃣", "3⃣"]))
            .catch(error => console.error(error));
            break;
        case "1234":
            message.channel.send({ embed })
            .then(reply => react(reply, ["1⃣", "2⃣", "3⃣", "4⃣"]))
            .catch(error => console.error(error));
            break;
        case "12345":
            message.channel.send({ embed })
            .then(reply => react(reply, ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣"]))
            .catch(error => console.error(error));
            break;
        case "daumen":
            message.channel.send({ embed })
            .then(reply => react(reply, ["👍", "👎"]))
            .catch(error => console.error(error));
            break;
        case "check":
            message.channel.send({ embed })
            .then(reply => react(reply, ["✅", "❌"]))
            .catch(error => console.error(error));
            break;
        case "help":
            message.reply(help);
            break;
        default:
            message.reply(help);
            break;
    }
}

async function react(msg, emojis) {
    asyncForEach(emojis, async (element) => {
        await msg.react(element);
    });
}

async function asyncForEach(array, callback) {
    for (let i = 0; i < array.length; i++) {
        await callback(array[i], i, array)
    }
}