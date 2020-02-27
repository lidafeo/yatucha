const postDb = require('../db/post');
const postLikeDb = require('../db/post_like');

module.exports = async function (id, user) {
    //проверяем, есть ли такой пост
    let post;
    [post] = await postDb.find.findById(id);
    if(post.length == 0) {
        return {error: "Нет такого поста"};
    }
    //проверяем, что пользователь его уже не лайкнул
    let like;
    [like] = await postLikeDb.find.findByPostIdAndLogin(id, user.login);
    if(like.length > 0) {
        return {error: "Пользователь уже поставил лайк посту"};
    }
    //сохраняем лайк
    let saveLike;
    [saveLike] = await postLikeDb.create.save(id, user);
    if(!saveLike.insertId) {
        return {error: "Не удалось схранить лайк"};
    }
    //добавляем посту лайк
    let addLikeToPost;
    [addLikeToPost] = await postDb.update.addLike(id);

    return {result: "success"};
}