const postDb = require('../db/post');

const getPostInfo = require('../post/find_info');

module.exports = async function (user, offset = 0) {
    let rows;
    [rows] = await postDb.find.findPage(offset);
    let posts = [];
    for(let i = 0; i < rows.length; i++) {
        let post = await getPostInfo(rows[i].id, user);
        posts.push(post)
    }
    return posts;
}