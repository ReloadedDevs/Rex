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
                    var collectedAnswers = collected.first().content.split('\n');
                    possibleAnswers = collectedAnswers.filter(answers => answers != '');
                    collected.first().delete();
                } else {
                    setupMSG.edit("Your answer took  to long, sorry.");
                    return;
                }
            });
        var embed
        switch (possibleAnswers.length) {
            case 2:
                var firstAnswer = possibleAnswers[0];
                var secondAnswer = possibleAnswers[1];
                embed = {
                    color: 0x3498db,
                    title: question,
                    fields: [{
                        name: firstAnswer,
                        value: "React with :one:"
                    },
                    {
                        name: secondAnswer,
                        value: "React with :two:"
                    }]
                }
                break;
            case 3:
                var firstAnswer = possibleAnswers[0];
                var secondAnswer = possibleAnswers[1];
                console.log(secondAnswer)
                var thirdAnswer = possibleAnswers[2];
                embed = {
                    color: 0x3498db,
                    title: question,
                    fields: [{
                        name: firstAnswer,
                        value: "React with :one:"
                    },
                    {
                        name: secondAnswer,
                        value: "React with :two:"
                    },
                    {
                        name: thirdAnswer,
                        value: "React with :three:"
                    }]
                }
                break;
            case 4:
                var firstAnswer = possibleAnswers[0];
                var secondAnswer = possibleAnswers[1];
                var thirdAnswer = possibleAnswers[2];
                var fourthAnswer = possibleAnswers[3];
                embed = {
                    color: 0x3498db,
                    title: question,
                    fields: [{
                        name: firstAnswer,
                        value: "React with :one:"
                    },
                    {
                        name: secondAnswer,
                        value: "React with :two:"
                    },
                    {
                        name: thirdAnswer,
                        value: "React with :three:"
                    },
                    {
                        name: fourthAnswer,
                        value: "React with :four:"
                    }]
                }
                break;
            case 5:
                var firstAnswer = possibleAnswers[0];
                var secondAnswer = possibleAnswers[1];
                var thirdAnswer = possibleAnswers[2];
                var fourthAnswer = possibleAnswers[3];
                var fifthAnswer = possibleAnswers[4];
                embed = {
                    color: 0x3498db,
                    title: question,
                    fields: [{
                        name: firstAnswer,
                        value: "React with :one:"
                    },
                    {
                        name: secondAnswer,
                        value: "React with :two:"
                    },
                    {
                        name: thirdAnswer,
                        value: "React with :three:"
                    },
                    {
                        name: fourthAnswer,
                        value: "React with :four:"
                    },
                    {
                        name: fifthAnswer,
                        value: "React with :five:"
                    }]
                }
                break;
            default:
                setupMSG.edit("You did enter to many answers or less. You can only enter two to five answers.");
                return;
        }
        setupMSG.edit("Okay, I collected all answers. My last question:\n**How long should the vote last in minutes?**");
        var filter = m => m.author.id == msg.author.id
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
        var votes = [];
        voteMSG.edit({embed});
        switch (possibleAnswers.length) {
            case 2:
                await voteMSG.react('1⃣');
                await voteMSG.react('2⃣');
                var filter = filter = (reaction, user) => (reaction.emoji.name === '1⃣' || reaction.emoji.name === '2⃣') && !(votes.includes(user.id)) && user.id != Client.user.id;
                break;
            case 3:
                await voteMSG.react('1⃣');
                await voteMSG.react('2⃣');
                await voteMSG.react('3⃣');
                var filter = filter = (reaction, user) => (reaction.emoji.name === '1⃣' || reaction.emoji.name === '2⃣' || reaction.emoji.name === '3⃣') && !(votes.includes(user.id)) && user.id != Client.user.id;
                break;
            case 4:
                await voteMSG.react('1⃣');
                await voteMSG.react('2⃣');
                await voteMSG.react('3⃣');
                await voteMSG.react('4⃣');
                var filter = filter = (reaction, user) => (reaction.emoji.name === '1⃣' || reaction.emoji.name === '2⃣' || reaction.emoji.name === '3⃣' || reaction.emoji.name === '4⃣') && !(votes.includes(user.id)) && user.id != Client.user.id;
                break;
            case 5:
                await voteMSG.react('1⃣');
                await voteMSG.react('2⃣');
                await voteMSG.react('3⃣');
                await voteMSG.react('4⃣');
                await voteMSG.react('5⃣');
                var filter = filter = (reaction, user) => (reaction.emoji.name === '1⃣' || reaction.emoji.name === '2⃣' || reaction.emoji.name === '3⃣' || reaction.emoji.name === '4⃣' || reaction.emoji.name === '5⃣') && !(votes.includes(user.id)) && user.id != Client.user.id;
                break;
        }
        var votesForOne   = 0;
        var votesForTwo   = 0;
        var votesForThree = 0;
        var votesForFour  = 0;
        var votesForFive  = 0;
        await voteMSG.awaitReactions(filter, { time: millisecs }).then(collected => {
            console.log(collected.first())
            /*votesForOne = collected.get('1⃣').count;
            votesForTwo = collected.get('2⃣').count;
            votesForThree = collected.get('3⃣').count;
            votesForFour = collected.get('4⃣').count;
            votesForFive = collected.get('5⃣').count;
            */
        });
        switch (possibleAnswers.length) {
            case 2:
                embed = {
                    color: 0x3498db,
                    title: question,
                    fields: [{
                        name: firstAnswer,
                        value: votesForOne + " Votes"
                    },
                    {
                        name: secondAnswer,
                        value: votesForTwo + " Votes"
                    }]
                }
                break;
            case 3:
                embed = {
                    color: 0x3498db,
                    title: question,
                    fields: [{
                        name: firstAnswer,
                        value: votesForOne + " Votes"
                    },
                    {
                        name: secondAnswer,
                        value: votesForTwo + " Votes"
                    },
                    {
                        name: thirdAnswer,
                        value: votesForThree + " Votes"
                    }]
                }
                break;
            case 4:
                embed = {
                    color: 0x3498db,
                    title: question,
                    fields: [{
                        name: firstAnswer,
                        value: votesForOne + " Votes"
                    },
                    {
                        name: secondAnswer,
                        value: votesForTwo + " Votes"
                    },
                    {
                        name: thirdAnswer,
                        value: votesForThree + " Votes"
                    },
                    {
                        name: fourthAnswer,
                        value: votesForFour + " Votes"
                    }]
                }
                break;
            case 5:
                embed = {
                    color: 0x3498db,
                    title: question,
                    fields: [{
                        name: firstAnswer,
                        value: votesForOne + " Votes"
                    },
                    {
                        name: secondAnswer,
                        value: votesForTwo + " Votes"
                    },
                    {
                        name: thirdAnswer,
                        value: votesForThree + " Votes"
                    },
                    {
                        name: fourthAnswer,
                        value: votesForFour + " Votes"
                    },
                    {
                        name: fifthAnswer,
                        value: votesForFive + " Votes"
                    }]
                }
                break;
        }
        voteMSG.edit({embed})
    });
}