const express = require("express");
const path = require("path");
const {alertLoc} = require(path.join(__dirname, "../moduls/util-loc") );
const {sqlExec, ...db} = require(path.join(__dirname, "../moduls/mysql-conn") );
const router = express.Router();

router.get("/", (req, res) => {
    (async () => {
        let = sql = "SELECT * FROM rest";
        const result = await sqlExec(sql);
        res.render("rest/crud.pug", {datas : result[0] });
    })();
});

router.post("/", (req, res) => {
    (async ()=> {
        let username = req.body.username;
        let sql = "INSERT INTO rest SET username=?, wdate=?";
        let sqlVals = [ username, new Date() ];
        let result = await sqlExec(sql, sqlVals);
        res.redirect("/rest")
    })();

});

router.put("/", (req, res) => {
    let userid = req.body.id;
    let username = req.body.username;
    (async ()=> {
        let sql = "UPDATE rest SET username=? where id=?";
        let sqlVals = [username, userid];
        let result = await sqlExec(sql, sqlVals);
        if( result[0].affectedRows > 0) {
            res.send( alertLoc("수정 되었습니다.", "/rest") );
        } else {
            res.send(alertLoc("수정에 실패하였습니다.", "/rest") );
        }
        res.redirect("/rest");
    })();
});

router.delete("/", (req, res) => {
    let id = req.body.id;
    (async ()=> {
        let sql = "DELETE FROM rest where id=" + id;
        result = await sqlExec(sql);
        if( result[0].affectedRows > 0) {
            res.send( alertLoc("삭제 되었습니다.", "/rest") );
        } else {
            res.send(alertLoc("삭제에 실패하였습니다.", "/rest") );
        }
    })()
});

module.exports = router;