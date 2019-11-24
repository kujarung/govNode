const path = require("path");
const {Sequelize, sequelize} = require(path.join(__dirname, "../moduls/sequelize-conn"));

const Model = Sequelize.Model;
class Scores extends Model {}

// init의 첫 인자는 데이터
// 두번 째 인자는
Scores.init({
    stdname : {type : Sequelize.STRING, allowNull : false},
    kor : {type : Sequelize.TINYINT, allowNull : false},
    end : {type : Sequelize.TINYINT, allowNull : false},
    math : {type : Sequelize.TINYINT, allowNull : false},
}, {
    sequelize,
    modelName : "knife",
    timestamps: false,
});

// force 옵션 : 테이블이 존재 한다면 삭제 후 만드시오
Scores.sync({force: false});

module.exports = {Scores}