const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 31231;
const pug = require('pug');

app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
});
app.use(bodyParser.urlencoded( {extended: false} ) );

/* mysql.js */
var mysql      = require('mysql');
/* var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'node',
  port     : '3306',
  password : 'qwe123',
  database : 'node'
});
 */

const conn = mysql.createPool({
    host     : 'localhost',
    user     : 'node',
    port     : '3306',
    password : 'qwe123',
    database : 'node',
    connectionLimit : 10
})


/* 정적 루트 설정 */
app.set("view engine", "pug");
app.set("views","./views");
app.locals.pretty = true;

app.get([ "/pug", "/pug/:typed" ], (req, res)=> {
    let titleChk = req.query.titleChk;
    let name = req.query.name;
    let typed = req.params.typed;
    
    console.log(typed);
    const users = [
        {id:1, name: "홍길동", age:25, title:{name:5332, age:543} },
        {id:2, name: "홍길순", age:28, title:{name:1231, age:125}},
        {id:3, name: "홍길만", age:32, title:{name:1, age:543535365363} },
    ]
    const vals = {name, title:"pug연습", users, titleChk};
    switch(typed) {
        case "include":
            res.render("include", vals);
            break;
        default: 
            res.render("block", vals);
            break;
    }
});

app.use("/", express.static("./public"));
app.get("/sample", (req, res)=> {
    res.send('<h1>sample 페이지에 오신 걸 환영함다</h1>');
})

const users = [
    {id: 1, name: "홍길동", age:25},
    {id: 2, name: "홍길순", age:22},
    {id: 3, name: "홍길만", age:21},
];

app.get( ["/api/", "/api/:type"], (req, res) =>{
    let type = req.params.type;
    if(!type) type = "list";
    switch(type) {
        case "list" :
            res.json({result : users});
            break;
        default :
            break;
    }
});

app.get(["/date", "/date/:type"], (req, res) => {
    let type = req.params.type;
    if(!type) type = "ts";
    switch(type) {
        case "ts" :
        res.send( `<h1 class="abc" id='aa'> ${String( new Date().getTime() )} </h1>` );
        break;
        default :
        res.send( `<h1> ${String( new Date() )} </h1>` );
        break;
    }
});

app.get("/insert-in", insertIn);

function insertIn(req,res) {
    const vals = {tit: '데이터 입력', subTit: '회원가입'};
    res.render('sql/insert', vals);
}

/* 기본적인 mysql 처리 ==> createConnection()을 이용함 */
app.post("/insert/:type", insertFn);
function insertFn(req, res) {
    const type = req.params.type;
    switch(type) {
        case "save" :
            var username = req.body.username;
            var age = req.body.age;
            var wdate = '2019-11-13 11:55:55';
            /* var sql = `INSERT INTO users SET username= "${username}", age= "${age}", wdate="${wdate}"`; */
            var sql = `INSERT INTO users SET username= ?, age= ?, wdate=?`;
            var sqlvals = [username, age, wdate];
            conn.connect();
            conn.query(sql, sqlvals, function (error, results, fields) {
                if (error) {
                    console.log(error);
                    res.send("Error");
                }
                else {
                    console.log('The solution is: ', results); 
                    if(results.affectedRows == 1) {
                        res.send("저장에 성공 하였습니다.");
                    } else {
                        res.send("저장에 실패하였습니다.");
                    }
                }
                conn.end();
            });
            break;
        case "save-pool" :
            var username = req.body.username;
            var age = req.body.age;
            var wdate = '2019-11-13 11:55:55';
            /* var sql = `INSERT INTO users SET username= "${username}", age= "${age}", wdate="${wdate}"`; */
            var sql = `INSERT INTO users SET username= ?, age= ?, wdate=?`;
            var sqlvals = [username, age, wdate];    
            conn.getConnection((err, connect) => {
                if(err) {
                    console.log(err);
                } else {
                    connect.query(sql, sqlvals, (err, results, fields)=> {
                        if(err) {
                            console.log(err)
                        } else {
                            res.json(results);
                        }
                        connect.release();
                    });
                }
            });
            break;
        default:
            res.send("취소");
            break;
    }
}