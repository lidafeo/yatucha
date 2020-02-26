let express = require('express');
let router = express.Router();

let modulePost = require('../modules/post');
let getCommonInfo = require('../modules/common/common_info');

/* GET home page. */
router.get('/', function(req, res, next) {
  modulePost.findAll().then(posts => {
    getCommonInfo(req.user).then(function (info) {
      res.render('index', { title: 'Главная', posts: posts, common: info});
    });
  });
});

module.exports = router;
