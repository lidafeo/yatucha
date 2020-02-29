let express = require('express');
let router = express.Router();

let modulePost = require('../modules/post');

let getCommonInfo = require('../modules/common/common_info');

router.get('/:category', function(req, res, next) {
    modulePost.findAllOfCategory(req.user, req.params['category'], 0).then(posts => {
        getCommonInfo(req.user).then(function (info) {
            res.render('category', {category: req.params['category'], posts: posts,
                common: info});
        });
    });
});

module.exports = router;