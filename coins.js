module.exports = {
    async add(person, amount, Client) {
        var fetchedCoins = await Client.amountOfCoins.fetch(person)
        if (fetchedCoins != null) {
            Client.amountOfCoins.add(person, amount);
        } else {
            Client.amountOfCoins.set(person, amount);
        }
    },

    async subtract(person, amount, Client) {
        var fetchedCoins = await Client.amountOfCoins.fetch(person)
        if (fetchedCoins != null) {
            Client.amountOfCoins.fetch(person).then(c => {
                if (c >= amount) {
                    Client.amountOfCoins.subtract(person, amount);
                    //return true;
                    callback(true)
                } else {
                    return false;
                };
            });
        } else {
            return false;
        }
    }
}