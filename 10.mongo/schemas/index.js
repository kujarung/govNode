const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        mongoose.connect('mongodb://localhost:15000/admin', {
            dbName: 'ku'
        }, (err) => {
            if(err) {
                console.log("몽고디비 연결 오류" + err)
            } else {
                console.log("몽고디비 연결 성공")
            }
        });
    }
    connect();
    mongoose.connection.on("error", (err) => {
        console.log("Mongo err" + err);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("Mongo disconnected" + err);
        connect();
    });

    require("./users")
}