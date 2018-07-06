const db = require('quick.db');
const coins = new db.table('coins')
module.exports = {
    add(person, amount) {
        if (coins.fetch(person)) {
            coins.add(person, amount);
        } else {
            coins.set(person, amount);
        };
    },

    substract(person, amount) {
        if (coins.fetch(person)) {
            coins.fetch(person).then(c => {
                if (c >= amount) {
                    coins.substract(person, amount);
                    return true;
                } else {
                    return false;
                };
            });
        } else {
            return false;
        };
    }
}