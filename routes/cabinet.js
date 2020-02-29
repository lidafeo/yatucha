let express = require('express');
const formidable = require("formidable");
let router = express.Router();

let getCommonInfo = require('../modules/common/common_info');
let modulePost = require('../modules/post');
let moduleChannel = require('../modules/channel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user = req.user;
  modulePost.findAllOfUser(user, 0).then(result => {
      getCommonInfo(req.user).then(function (info) {
        res.render('cabinet/index', { user: user.name, posts: result, common: info});
    });
  });
});

router.get('/add-post', function(req, res, next) {
  let user = req.user;
  getCommonInfo(req.user).then(function (info) {
    res.render('cabinet/add_post', { user: user.name, common: info});
  });
});

router.post('/add-post', function(req, res, next) {
    let user = req.user;
    let form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(files);
        console.log(fields);
        getCommonInfo(req.user).then(function (info) {
            modulePost.savePost(user, files, fields).then(result => {
                console.log(result);
                res.json({"result": "success", "id": result});
                //res.redirect('/post/' + result);
                //res.render('cabinet/add_post', { user: user.name, common: info});
            });
        });
    });
});

router.get('/profile', function(req, res, next) {
    let user = req.user;
    getCommonInfo(req.user).then(function (info) {
        console.log(info.user);
        res.render('cabinet/profile', { user: user.name, common: info, save: req.query.save});
    });
});

router.post('/profile', function(req, res, next) {
    let profile = {login: req.user.login, name: req.body.name, email: req.body.email,
        phone: req.body.phone, status: req.body.status, description: req.body.description};
    moduleChannel.updateUser(profile).then(result => {
        if(result.result == 'success') {
            return res.redirect('/cabinet/profile?save=ok');
        }
        res.json({error: 'Не удалось изменить данные профиля'});
    });
});

module.exports = router;
