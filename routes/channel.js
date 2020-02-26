let express = require('express');
let router = express.Router();

let moduleChannel = require('../modules/channel');

let getCommonInfo = require('../modules/common/common_info');

router.get('/:post', function(req, res, next) {
    moduleChannel.findInfo(req.params['post']).then(result => {
        if(result.length == 0) {
            return res.render('error/404');
        }
        getCommonInfo(req.user).then(function (info) {
            res.render('channel', { channel: result[0], common: info});
        });
    });
});

module.exports = router;