let express = require('express');
let router = express.Router();

let modulePost = require('../modules/post');

let getCommonInfo = require('../modules/common/common_info');

router.get('/:post', function(req, res, next) {
    modulePost.findInfo(req.params['post'], req.user).then(result => {
        if(result.length == 0) {
           return res.render('error/404');
        }
        getCommonInfo(req.user).then(function (info) {
            res.render('post', { post: result, common: info});
        });
    });
});

module.exports = router;