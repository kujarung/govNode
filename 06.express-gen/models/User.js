module.exports = (sequelize, dataTypes) => {
    return sequelize.define('user_seqs', {
        username : {type : dataTypes.STRING, allowNull : false},
    });
}