const express = require("express");

const app = express();
const port = 2314;
const pug = require('pug');

app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
});

/* node module */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded( {extended: false} ) );


/* const db = require("./moules/mysql-conn"); 
   const mysq = db.mysql;
   const conn = db.conn;
   const sqlExec = db.sqlExec;
*/

/* my module */
const {mysql, conn, sqlExec} = require("./moules/mysql-conn");
const {alertLoc} = require("./moules/util-loc");
const {zp, isoDate, js2iso} = require("./moules/util-date");

/* 정적 루트 설정 */
app.use("/", express.static("./public"));

/* pug설정 */
app.set("view engine", "pug");
app.set("views","./views");
app.locals.pretty = true;

/* router - post 글쓰기 */
app.post("/user/:type", userPost);

/* router - cb 글쓰기 및 리스트 */
app.get(["/user/:type", "/user/:type/:id" ], userGet); //wr li


function userGet(req, res) {
    const type = req.params.type;
    const id = req.params.id;
    switch(type) {
        case "wr" :
            const vals = {tit: "데이터 입력", subTit: "회원가입"};
            res.render("sql/insert", vals);
            break;
        case "li" :
            ( async() => {
                let sql = "SELECT * FROM USERS ORDER BY id DESC";
                const result = await sqlExec(sql);
                let datas = js2iso(result[0], "wdate");
                const vals = {tit: "데이터 출력", subTit: "회원 리스트", datas};
                res.render("sql/list", vals);
            })();
            break;
        case "up" : 
            (async ()=> {
                let sql = "SELECT * FROM USERS WHERE ID =?";
                let sqlVals = [req.params.id];
                const result = await sqlExec(sql, sqlVals);
                let vals = {tit: "데이터 수정", subTit: "회원 리스트", datas : result[0][0] };
                res.render("sql/update", vals);
            })();
            break;
        case "rm" :
            (async () => {
                const sql = "DELETE FROM users WHERE ID = "+ id;
                result = await sqlExec(sql);
                if(result[0].affectedRows > 0) {
                    res.send( alertLoc("삭제 되었습니다.", "/user/li") );
                } else {
                    res.send( alertLoc("삭제가 완료되지 않았습니다. 관리자에게 문의 바랍니다.", '/user/li') );
                }
            })();
            break;
        default : 
            break;
    }
}

function userPost(req, res) {
    const type = req.params.type;
    const username= req.body.username;
    const age = req.body.age;
    let id = req.body.id;
    let sql = "", sqlVals=[], result = null;
    switch(type) {
        case "save" :
            ( async () => {
                sql = `INSERT INTO users SET username=?, age=?, wdate=?`;
                sqlvals = [username, age, isoDate(new Date()) ];    
                result = await sqlExec(sql, sqlvals);
                res.send(alertLoc("저장 되었습니다.", "/user/li"));
            })();
            break;
        case "update" :
            ( async () => {
                sql = `UPDATE users SET username=?, age=? WHERE id=?`;
                sqlvals = [username, age, id];    
                result = await sqlExec(sql, sqlvals);
                if(result[0].affectedRows > 0) {
                    res.send(alertLoc("수정 되었습니다.", "/user/li"));
                } else {
                    res.send(alertLoc("수정이 실패하였습니다.", "/user/li"));
                }
                
            })();        
            break;
        default : 
            break;
    }
}