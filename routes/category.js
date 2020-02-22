let express = require('express');
let router = express.Router();

let getCommonInfo = require('../modules/common/common_info');

router.get('/:category', function(req, res, next) {
    getCommonInfo(req.user).then(function (info) {
        res.render('category', { category: req.params['category'], common: info});
    });
});

module.exports = router;