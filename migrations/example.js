const query = require('../modules/db/connect_db');

query("SELECT * FROM categories").then(([rows, fields]) => {
    //console.log(result);
    //console.log(result[1]);
    console.log(rows[0].name);
    console.log(rows[1].name);
    //console.log(fields[0].name);
    //let res = result;
   // console.log(res[1]['id'], res[0].name, res[1].name_eng);
});