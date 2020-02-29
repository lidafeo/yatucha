const Channel = require('./channel');

module.exports = class User {
    constructor(user, channel = null) {
        this.name = user.name;
        this.login = user.login;
        this.phone = user.phone;
        this.email = user.email;
        this.password = user.password;
        if(channel) {
            this.channel = new Channel(channel);
        }
    }
};
