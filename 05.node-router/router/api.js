const express = require("express");
const path = require("path");
const {alertLoc} = require(path.join(__dirname, "../moduls/util-loc") );
const {sqlExec, ...db} = require(path.join(__dirname, "../moduls/mysql-conn") );
const router = express.Router();

router.get("/", (req, res, next) => {
    (async () => {
        let = sql = "SELECT * FROM rest";
        const result = await sqlExec(sql);
        res.json(result[0]);
    })();
});

router.post("/", (req, res) => {
    (async ()=> {
        let username = req.body.username;
        let sql = "INSERT INTO rest SET username=?, wdate=?";
        let sqlVals = [ username, new Date() ];
        let result = await sqlExec(sql, sqlVals);
        res.json(result[0]);
    })();

});

router.put("/", (req, res, next) => {
    let userid = req.body.id;
    let username = req.body.username;
    (async ()=> {
        let sql = "UPDATE rest SET username=? where id=?";
        let sqlVals = [username, userid];
        let result = await sqlExec(sql, sqlVals);
        res.json(result[0]);
    })();
});

router.delete("/", (req, res, next) => {
    let id = req.body.id;
    (async ()=> {
        let sql = "DELETE FROM rest where id=" + id;
        result = await sqlExec(sql);
        res.json(result[0]);
    })()
});

router.get("/err", (req, res, next) => {
    throw new Error("Error!!!");
})

module.exports = router;