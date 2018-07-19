const debug = true;
(debug == true ? console.log("Debug is on!") : console.log("Debug is off!"));

const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
db.createWebview('password', '1111');

const logger = require('./utils/logger');
const loader = require('./utils/loader');
const commandHandler = require('./utils/commandHandler');
//const Connection = require('./utils/mysql');
const functions = require('./utils/functions');

const giveXP = require('./xp');
const coins  = require('./coins')

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

class Rex extends Discord.Client {
    constructor(options) {
        super(options);
        this.debug = debug;
        this.config = config;
        this.log = logger;
        this.functions = functions;
        this.prefix = (debug ? "rt!" : "r!");
        this.commands = new Discord.Collection();
        this.servers = new Discord.Collection();
        this.db = db;
        this.coins = coins;
        this.amountOfCoins = new db.table('coins');
        this.xp = new db.table('xp');
        this.level = new db.table('level');
        this.boughtColors = new db.table('boughtColors');
//        this.mysql = new Connection.MySql("127.0.0.1", "bot", "bot");
    }
}

const Client = new Rex({ messageCacheMaxSize: 100, messageCacheLifetime: 86400, messageSweepInterval: 86400, disabledEvents: ['TYPING_START'] });

const init = async () => {
    Client.login((debug == true ? config.bot.debug_token : config.bot.token)).then(Client.log.info("[Core] Successfully logged in to Discord API! Waiting for response..."));
    await loader.run(Client);

    Client.on('message', msg => {
        commandHandler.run(Client, msg);
        giveXP.run(msg, Client, Client.xp, Client.level);
    });
}

init();