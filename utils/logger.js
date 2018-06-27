const fs = require("fs");
const colors = require("colors");

const error = (content) => {
    var first = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    var upgrade = first.split(":");

    upgrade[0] = parseInt(upgrade[0]) + 2;
    var time = upgrade.join(":");

    content.split('\n').forEach(s => {
        console.log(`[${time}] `.white + ` ${'[ ERROR ]'} `.red + ` ${s}`);
        write_full(`[${time}] ` + ` ${'[ ERROR ]'} ` + ` ${s}`);
    });
}

const info = (content) => {
    var first = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '').split(" ")[1];
    var upgrade = first.split(":");

    upgrade[0] = parseInt(upgrade[0]) + 2;
    var time = upgrade.join(":");

    content.split('\n').forEach(s => {
        console.log(`[${time}] `.white + ` ${'[ INFO ]'} `.green + ` ${s}`);
        write_full(`[${time}] ` + ` ${'[ INFO ]'} ` + ` ${s}`);
    });
}

function write_full(text) {
    var time = new Date().toISOString().split("T")[0];

    if (!fs.existsSync('logs')) {
        fs.mkdirSync('logs/');
        info("[Logger] Creating directory ./logs/");
    }

    fs.stat(`logs/Rex_${time}.txt`, function(err, stat) {
        if(err == null) {
            fs.appendFile(`logs/Rex_${time}.txt`, `${text}\n`, (err) => {
                if (err) console.log(err);
            }); 
        } else if(err.code == 'ENOENT') {
            fs.writeFile(`logs/Rex_${time}.txt`, `${text}\n`, (err) => {
                if (err) console.log(err);
            });
        } else {
            console.log('Some other error: ', err.code);
        }
    });
}

module.exports.info = info;
module.exports.error = error;