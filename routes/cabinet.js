let express = require('express');
const formidable = require("formidable");
let router = express.Router();

let getCommonInfo = require('../modules/common/common_info');
let modulePost = require('../modules/post');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user = req.user;
  getCommonInfo(req.user).then(function (info) {
    res.render('cabinet/index', { user: user.name, common: info});
  });
});

router.get('/add-post', function(req, res, next) {
  let user = req.user;
  getCommonInfo(req.user).then(function (info) {
      console.log(info);
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
module.exports = router;
