const saveLike = require("../modules/post/like");

module.exports = function(req, res) {
    let postId = req.body.postId;
    if(!req.user || !req.user.login) {
        return res.json({"error": "Пользователь не вошел в систему"});
    }
    saveLike(postId, req.user).then(result => {
        if(result.error) {
            return res.json({"error": result.error});
        }
        res.json({"result": "success"});
    });
};