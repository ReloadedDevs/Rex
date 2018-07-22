const Discord = require("discord.js");
const Report = require("../models/report.js");
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    mongoose.connect('mongodb+srv://<Username>:<Password>@discordbots-s1ywh.mongodb.net/reports?retryWrites=true')
    let rUser = message.mentions.members.first();
    if(!rUser) return message.reply("I couldn't find a user.")
    let rreason = args.slice(1).join(" ")
    if(!rreason) return message.reply("please specify a reason.")

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
    reportschannel.send(reportEmbed);


    const report = new Report({
        _id: mongoose.Types.ObjectId(),
        username: rUser.user.username,
        userID: rUser.id,
        reason: rreason,
        rUsername: message.author.username,
        rID: message.author.id,
        time: message.createdAt
    });

    report.save()
    .then(result => console.log(result))
    .catch(err => console.log(err));

}

module.exports.help = {
    name: "report"
}