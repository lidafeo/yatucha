const query = require('../modules/db/connect_db');

let categories = [['кино', 'movie'],
                    ['путешествия', 'travel'],
                    ['стиль', 'style'],
                    ['спорт', 'sport'],
                    ['творчество', 'art']];

insertCategories();

function insertCategories() {
    Promise.all(categories.map(function (category) {
        return query("INSERT INTO categories (name, name_eng, actual) VALUES (?, ?, 1)", category);
    })).then(result => {
        console.log("Таблица categories заполнена");
    });
}