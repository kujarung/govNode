const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    host : "localhost", 
    port     : '3306',
    dialect : "mysql",
    username : "node",
    password : 'qwe123',
    database : 'node',
    pool : {
        max : 10,
        min : 0,
        acquire : 30000,
        idle : 10000
    }
});

(async()=> {
    try {
        await sequelize.authenticate();
        console.log("sucess");
    } catch(err) {
        throw new Error(err);
    }
})();

module.exports = {Sequelize, sequelize}