module.exports = {
    async add(person, amount, Client) {
        var fetchedCoins = await Client.amountOfCoins.fetch(person)
        if (fetchedCoins != null) {
            Client.amountOfCoins.add(person, amount);
        } else {
            Client.amountOfCoins.set(person, amount);
        }
    },

    async subtract (person, amount, Client) {
        let fetchedCoins = await Client.amountOfCoins.fetch(person)
        if (fetchedCoins != null && fetchedCoins >= amount) {
            await Client.amountOfCoins.subtract(person, amount);
            return true;
        }
        return false; 
    }
}