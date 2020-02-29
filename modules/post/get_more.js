const findAll = require('./find_all');
const findAllOfUser = require('./find_of_user');
const findAllOfCategory = require('./find_of_category');

module.exports = async function (page, url, user) {
    let posts = [];
    let url2;
    if(url[0] == '/') {
        url2 = url.substr(1);
    }
    let arr = url2.split('/');
    if(url == '/') {
        posts = await findAll(user, (+page)*10);
    }
    else if(url == '/cabinet') {
        posts = await findAllOfUser(user, (+page)*10);
    }
    else if(arr[0] == 'category' && arr.length == 2) {
        posts = await findAllOfCategory(user, arr[1], (+page)*10);
    }
    /*
    let posts = [];
    for(let i = 0; i < rows.length; i++) {
        let post = await getPostInfo(rows[i].id, user);
        posts.push(post)
    }
     */
    return {result: "success", posts: posts};
}