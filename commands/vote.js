module.exports.run = async (Client, msg, args) => {
    await msg.channel.send("Hey " +  msg.author.toString() + "! Lets setup your vote. First of all:\n**What is your question?**").then(async setupMSG => {
        var filter = m => m.author.id == msg.author.id;
        var question;
        await msg.channel.awaitMessages(filter, { maxMatches: 1, time:  300000})
            .then(collected => {
                if (collected.size == 1) {
                    question = collected.first().content;
                    collected.first().delete();
                    console.log(question)
                } else {
                    setupMSG.edit("Your answer took to long, sorry.");
                    return;
                }
            });
        setupMSG.edit("Okay your question is *" + question + "*. Now tell me:\n**Every possible answer in a new line. (Note: Minimum: 2 answers, Maximum: 5 answers)\nExample:\nYes!\nNo!**");
        var filter = m => m.author.id == msg.author.id;
        var possibleAnswers
        await msg.channel.awaitMessages(filter, { maxMatches: 1, time: 300000 })
            .then(collected => {
                if (collected.size == 1) {
                    possibleAnswers = collected.first().content.split('\n');
                    collected.first().delete();
                } else {
                    setupMSG.edit("Your answer took  to long, sorry.");
                    return;
                }
            });
        switch (possibleAnswers.length) {
            case 2:
                var firstAnswer = possibleAnswers[0];
                var secondAnswer = possibleAnswers[1];
                break;
            case 3:
                var firstAnswer = possibleAnswers[0];
                var secondAnswer = possibleAnswers[1];
                var thirdAnswer = possibleAnswers[2];
                break;
            case 4:
                var firstAnswer = possibleAnswers[0];
                var secondAnswer = possibleAnswers[1];
                var thirdAnswer = possibleAnswers[2];
                var fourthAnswer = possibleAnswers[3];
                break;
            case 5:
                var firstAnswer = possibleAnswers[0];
                var secondAnswer = possibleAnswers[1];
                var thirdAnswer = possibleAnswers[2];
                var fourthAnswer = possibleAnswers[3];
                var fifthAnswer = possibleAnswers[4];
                break;
            default:
                setupMSG.edit("You did enter to many answers or less. You can only enter two to five answers.");
                return;
                break;
        }
        setupMSG.edit("Okay, I collected all answers. My last question:\n**How long should the vote last in minutes?**");
        var filter = m => m.author.id == msg.author.id;
        var millisecs
        await msg.channel.awaitMessages(filter, { maxMatches: 1, time: 300000 })
            .then(collected => {
                if (collected.size == 1) {
                    millisecs = collected.first() * 60000;
                    console.log(millisecs);
                    collected.first().delete();
                } else {
                    setupMSG.edit("Your answer took to long, sorry.");
                    return;
                }
            });
        var voteMSG = setupMSG;
        voteMSG.edit({embed: {
            color: 0x3498db,
            title: question,
            
        }})
    })
}