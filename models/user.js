module.exports = class User {
    constructor(user) {
        this.name = user.name;
        this.login = user.login;
        this.phone = user.phone;
        this.password = user.password;
    }
};
