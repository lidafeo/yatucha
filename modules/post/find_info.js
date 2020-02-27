const fs = require("fs");

const postDb = require('../db/post');
const postImgDb = require('../db/post_img');
const postTagDb = require('../db/post_tag');
const postLikeDb = require('../db/post_like');

const Post = require('../../models/post');

module.exports = async function (id, user) {
    let post;
    [post] = await postDb.find.findById(id);
    let postImg;
    [postImg] = await postImgDb.find.findAllByPostId(id);
    let postTag;
    [postTag] = await postTagDb.find.findAllByPostId(id);
    let userLike = false;
    let rows;
    if(user) {
        [rows] = await postLikeDb.find.findByPostIdAndLogin(id, user.login);
        if(rows.length > 0) {
            userLike = true;
        }
    }

    return new Post(post[0], postImg, postTag, userLike);
}