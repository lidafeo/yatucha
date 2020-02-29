const getMore = require("../modules/post/get_more");

module.exports = function(req, res) {
    let url = req.body.url;
    console.log(url);
    let page = req.body.page;
    getMore(page, url, req.user).then(result => {
        if(result.error) {
            return res.json({"error": result.error});
        }
        if(result.posts.length == 0) {
            return res.json({"count": 0});
        }
        console.log("render");
        res.render('blocks/page_posts', {posts: result.posts});
    });
};