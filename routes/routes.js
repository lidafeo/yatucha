module.exports = function (app, passport, auth) {
    app.use('/', require('./index'));
    app.use('/cabinet', auth.middleware(), require('./cabinet'));
    app.use('/login', require('./login')(passport));
    app.use('/logout', require('./logout')(passport));
    app.use('/signup', require('./signup')(passport));
    app.use('/category', require('./category'));
    app.use('/post', require('./post'));
    app.use('/channel', require('./channel'));

    //
    app.post('/like', require('./like'));
    app.post('/get-more', require('./get-more'));
}
