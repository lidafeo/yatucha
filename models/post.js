//const postDb = require('../modules/db/post');
//const postImgDb = require('../modules/db/post_img');
//const postTagDb = require('../modules/db/post_tag');

module.exports = class Post {
    constructor(post, img = null, tags = null, userLike = false) {
        this.id = post.id;
        this.channel = post.channel;
        this.title = post.title;
        this.body = post.body;
        this.visits = post.visits;
        this.categoryId = post.category_id;
        this.datePublication = post.date_publication;
        this.likes = post.likes;
        this.userLike = userLike;
        console.log(this.userLike);
        if(post.category_name) {
            this.categoryName = post.category_name;
        }
        if(post.category_name_eng) {
            this.categoryNameEng = post.category_name_eng;
        }
        if(img) {
            this.img = img;
        }
        if(tags) {
            this.tags = tags;
        }
    }
    getDatePubl() {
        if(!this.datePublication) {
            return "";
        }
        let date = new Date(this.datePublication);
        let hours = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours();
        let minutes = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes();
        let day = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate();
        let month = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1);
        return hours + ":" + minutes + " " + day + "." + month + "." + date.getFullYear()%100;
    }
};