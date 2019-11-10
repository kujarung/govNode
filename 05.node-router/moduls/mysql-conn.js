/* mysql.js */
var mysql      = require('mysql2/promise');
const conn = mysql.createPool({
    host     : 'localhost',
    user     : 'node',
    port     : '3306',
    password : 'qwe123',
    database : 'node',
    connectionLimit : 10,
    waitForConnections : true
});

const sqlExec = async (sql, sqlVals) => {
    try {
        const connect = await conn.getConnection();
        const result = await connect.query(sql, sqlVals);
        connect.release();
        return result;
    } catch(error) {
        console.log(error);
    }
};

module.exports = {mysql, conn, sqlExec}