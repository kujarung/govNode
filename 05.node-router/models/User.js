const path = require("path");
const {Sequelize, sequelize} = require(path.join(__dirname, "../moduls/sequelize-conn"));

const Model = Sequelize.Model;
class User extends Model {}

// init의 첫 인자는 데이터
// 두번 째 인자는
User.init({
    username : {type : Sequelize.STRING, allowNull : false}
}, {
    sequelize,
    modelName : "user_seqs"
});

User.sync({force: false});

module.exports = {User}