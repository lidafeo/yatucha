module.exports = class Channel {
    constructor(channel) {
        this.login = channel.login;
        this.description = "";
        if(channel.description) {
            this.description = channel.description;
        }
        this.status = "";
        if(channel.status) {
            this.status = channel.status;
        }
        this.subscribers = 0;
        if(channel.subscribers) {
            this.subscribers = channel.subscribers;
        }
        this.subscriptions = 0;
        if(channel.subscriptions) {
            this.subscriptions = channel.subscriptions;
        }
        this.visit = 0;
        if(channel.visit) {
            this.visit = channel.visit;
        }
    }
};