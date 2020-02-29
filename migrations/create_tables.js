const query = require('../modules/db/connect_db');

createTables().then(res => {
    console.log("Таблицы добавлены");
});

async function createTables() {
    let rows, fields;
    [rows, fields] = await query("CREATE TABLE users (name VARCHAR(128) NOT NULL, login VARCHAR(128) NOT NULL, " +
        "password VARCHAR(256) NOT NULL, phone VARCHAR(32) NOT NULL, email VARCHAR(64) NULL, " +
        "last_visit datetime NULL, PRIMARY KEY(login))");
    console.log(rows);
    console.log("Создана таблица users");

    await query("CREATE TABLE channels (login VARCHAR(128) NOT NULL, description VARCHAR(512) NULL, " +
        "status VARCHAR(256) NULL, subscribers int(10) NOT NULL DEFAULT 0, " +
        "subscriptions int(10) NOT NULL DEFAULT 0, visits int(16) NOT NULL DEFAULT 0, " +
        "rating int(10) NOT NULL DEFAULT 0, " +
        "PRIMARY KEY(login), FOREIGN KEY (login) REFERENCES users (login) ON UPDATE CASCADE)");
    console.log("Создана таблица channels");

    await query("CREATE TABLE subscriptions (id INT(32) NOT NULL AUTO_INCREMENT, " +
        "channel VARCHAR(128) NOT NULL, subscriber VARCHAR(128) NOT NULL, " +
        "visits int(16) NOT NULL DEFAULT 1, last_visit datetime NULL, " +
        "PRIMARY KEY(id), FOREIGN KEY (channel) REFERENCES channels (login) ON UPDATE CASCADE, " +
        "FOREIGN KEY (subscriber) REFERENCES users (login) ON UPDATE CASCADE)");
    console.log("Создана таблица subscriptions");

    await query("CREATE TABLE categories (id INT(32) NOT NULL AUTO_INCREMENT, name VARCHAR(128) NOT NULL, " +
        "name_eng VARCHAR(128) NOT NULL, sort int(10) DEFAULT 10, actual TINYINT(1) NOT NULL, PRIMARY KEY(id))");
    console.log("Создана таблица categories");

    await query("CREATE TABLE posts (id INT(32) NOT NULL AUTO_INCREMENT, channel VARCHAR(128) NOT NULL, " +
        "title VARCHAR(64) NOT NULL, body VARCHAR(1024) NULL, visits int(16) NOT NULL DEFAULT 0, " +
        "category_id int(32) NULL, date_publication datetime NULL, likes int(10) NOT NULL DEFAULT 0, " +
        "actual TINYINT(1) NOT NULL, PRIMARY KEY(id), " +
        "FOREIGN KEY (channel) REFERENCES channels (login) ON UPDATE CASCADE," +
        "FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE)");
    console.log("Создана таблица posts");

    await query("CREATE TABLE post_img (id INT(32) NOT NULL AUTO_INCREMENT, posts_id int(32) NOT NULL, " +
        "filename VARCHAR(128) NOT NULL, main TINYINT(1) NOT NULL DEFAULT 0, PRIMARY KEY(id), " +
        "FOREIGN KEY (posts_id) REFERENCES posts (id) ON DELETE CASCADE)");
    console.log("Создана таблица post_img");

    await query("CREATE TABLE post_tags (id INT(32) NOT NULL AUTO_INCREMENT, posts_id int(32) NOT NULL, " +
        "tag VARCHAR(64) NOT NULL, PRIMARY KEY(id), " +
        "FOREIGN KEY (posts_id) REFERENCES posts (id) ON DELETE CASCADE)");
    console.log("Создана таблица post_tags");

    await query("CREATE TABLE post_likes (id INT(32) NOT NULL AUTO_INCREMENT, posts_id int(32) NOT NULL, " +
        "login VARCHAR(128) NOT NULL, date_like datetime NULL, PRIMARY KEY(id), " +
        "FOREIGN KEY (posts_id) REFERENCES posts (id) ON DELETE CASCADE, " +
        "FOREIGN KEY (login) REFERENCES users (login) ON UPDATE CASCADE)");
    console.log("Создана таблица post_likes");

    await query("CREATE TABLE post_comments (id INT(32) NOT NULL AUTO_INCREMENT, posts_id int(32) NOT NULL, " +
        "login VARCHAR(128) NOT NULL, comment VARCHAR(256) NOT NULL, date_comment datetime NULL, " +
        "PRIMARY KEY(id), FOREIGN KEY (posts_id) REFERENCES posts (id) ON DELETE CASCADE, " +
        "FOREIGN KEY (login) REFERENCES users (login) ON UPDATE CASCADE)");
    console.log("Создана таблица post_comments");
}