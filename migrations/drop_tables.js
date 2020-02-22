const query = require('../modules/db/connect_db');

dropTables().then(result => {
    console.log("Таблицы удалены");
});

async function dropTables() {
    await query("DROP TABLE post_img");
    console.log("Таблица post_img удалена");

    await query("DROP TABLE post_tags");
    console.log("Таблица post_tags удалена");

    await query("DROP TABLE post_comments");
    console.log("Таблица post_comments удалена");

    await query("DROP TABLE post_likes");
    console.log("Таблица post_likes удалена");

    await query("DROP TABLE subscriptions");
    console.log("Таблица subscriptions удалена");

    await query("DROP TABLE posts");
    console.log("Таблица posts удалена");

    await query("DROP TABLE categories");
    console.log("Таблица categories удалена");

    await query("DROP TABLE channels");
    console.log("Таблица channels удалена");

    await query("DROP TABLE users");
    console.log("Таблица users удалена");
}

