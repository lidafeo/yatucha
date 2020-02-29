let express = require('express');
let router = express.Router();

let modulePost = require('../modules/post');
let getCommonInfo = require('../modules/common/common_info');

/* GET home page. */
router.get('/', function(req, res, next) {
  modulePost.findAll(req.user).then(posts => {
    getCommonInfo(req.user).then(function (info) {
      console.log("Пользователь", req.user);
      res.render('index', { title: 'Главная', posts: posts, common: info});
    });
  });
});

module.exports = router;
