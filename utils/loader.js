const readdir = require("util").promisify(require("fs").readdir);

exports.run = async (Client) => {
    readdir("./commands/", (err, files) => {
        if(err) Client.log.error("[Shard " + (Client.shard.id + 1) + "] [Core] " + err);

        var commands = files.filter(f => f.split(".").pop() === "js");

        Client.log.info("[Core] " + commands.length + " commands found!");

        commands.forEach(command => {
            const cmd = require(`../commands/${command}`);
            Client.commands.set(command.split(".")[0], cmd);

            Client.log.info(`[Core] Command '${command.split(".")[0]}' was loaded!`);
        });

        Client.log.info("[Core] All commands were loaded!");
    });
}