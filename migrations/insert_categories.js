const query = require('../modules/db/connect_db');

let categories = [['фото', 'photo', 1]
                    ['кино', 'movie', 5],
                    ['путешествия', 'travel', 4],
                    ['стиль', 'style', 2],
                    ['спорт', 'sport', 5],
                    ['творчество', 'art', 3],
                    ['другое', 'other', 20]];

insertCategories();

function insertCategories() {
    Promise.all(categories.map(function (category) {
        return query("INSERT INTO categories (name, name_eng, sort, actual) VALUES (?, ?, ?, 1)", category);
    })).then(result => {
        console.log("Таблица categories заполнена");
    });
}