const fs = require("fs");

const postDb = require('../db/post');
const postImgDb = require('../db/post_img');
const postTagDb = require('../db/post_tag');
const categoryDb = require('../db/category');
let parseTags = require('./parse_tag');

module.exports = async function (user, files, data) {
    let rows;
    [rows] = await categoryDb.find.findByNameEng(data.category);
    data.categoryId = rows[0]['id'];
    //сохраняем пост
    [rows] = await postDb.create.save(user, data);
    let idPost = rows.insertId;
    //сохраняем теги
    let tags = parseTags(data.tag);
    if (tags.length > 0) {
        [rows] = await Promise.all(tags.map(tag => {
            return postTagDb.create.save(idPost, tag);
        }));
    }
    //сохраняем картинки
    if (files.file1) {
        //формируем массив файлов
        let filesArr = [];
        let ind = 1;
        while(files['file' + ind]) {
            filesArr.push(files['file' + ind]);
            ind++;
        }
        [rows] = await Promise.all(filesArr.map((file, index) => {
            //сохраняем картинку в папку
            let ext = file.name.split('.').pop();
            let date = new Date();
            let filename = "p" +  idPost + "i" + (index + 1) + "d" + date.getDate() + (date.getMonth() + 1)
                + date.getFullYear() + "." + ext;
            let readableStream = fs.createReadStream(file.path);
            let writeableStream = fs.createWriteStream("../files/files_posts/" + filename);
            readableStream.pipe(writeableStream);
            let main = 0;
            if(index === 0) {
                main = 1;
            }
            return postImgDb.create.save(idPost, filename, main);
        }));
        return idPost;
    }
}