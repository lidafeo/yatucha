let express = require('express');
let router = express.Router();

let getCommonInfo = require('../modules/common/common_info');

/* GET users listing. */
router.get('/', function(req, res, next) {
  let user = req.user;
  getCommonInfo(req.user).then(function (info) {
    res.render('cabinet/index', { user: user.name, common: info});
  });
});

router.get('/add_post', function(req, res, next) {
  let user = req.user;
  getCommonInfo(req.user).then(function (info) {
    res.render('cabinet/add_post', { user: user.name, common: info});
  });
});

module.exports = router;
