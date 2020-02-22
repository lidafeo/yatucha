const mysql = require('mysql2');
const config = require('../../config/config.js');

const pool = mysql.createPool({
	host: config.db.host, 
	user: config.db.user, 
	password: config.db.password,
	database: config.db.database,
	connectionLimit: 10
});

let conn = pool.promise();

module.exports = async function (query, obj) {

	try {
		//conn = await pool.getConnection();
		let rows, fields;
		if(obj)
			[rows, fields] = await conn.query(query, obj);
		else
			[rows, fields] = await conn.query(query);
		return [rows, fields];
	} catch (err) {
		throw err;
	}// finally {
	//	if(conn) conn.end();
	//}
}