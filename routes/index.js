let express = require('express');
let router = express.Router();

let getCommonInfo = require('../modules/common/common_info');

/* GET home page. */
router.get('/', function(req, res, next) {
  getCommonInfo(req.user).then(function (info) {
    res.render('index', { title: 'Главная', common: info});
  });
});

module.exports = router;
