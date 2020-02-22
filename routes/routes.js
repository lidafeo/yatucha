let routers = {
    index: require('./index'),
    cabinet: require('./cabinet'),
    login: require('./login'),
    logout: require('./logout'),
    signup: require('./signup'),
    category: require('./category'),
}

module.exports = function (app, passport, auth) {
    app.use('/', routers.index);
    app.use('/cabinet', auth.middleware(), routers.cabinet);
    app.use('/login', routers.login(passport));
    app.use('/logout', routers.logout(passport));
    app.use('/signup', routers.signup(passport));
    app.use('/category', routers.category);
}
