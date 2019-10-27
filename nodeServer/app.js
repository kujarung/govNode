//require ==> commonjs에 사용 되는 문법
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//사용자 지정 모듈
const util = require("./modules/util");

//콜백이란 ? ==> 
// 서버 실행
app.listen(3000, () => {
    console.log("http://127.0.0.1:3000");
});


//라우터(get라우터)
//정적 라우터
app.use("/", express.static("./public") );
app.use(bodyParser.urlencoded( {extended: false} ) )

//동적 라우터
app.get("/hello", (req, res, next) => {
    var name = req.query.name;
    res.send(`<h1>${name} Hello Node</h1>`);
});

app.get("/test", (req, res) => {
    res.send(`<h1 class="h1Class">연습11</h1>`);
});

// : ==> params
app.get(  ["/book", "/book/:id"], (req, res, next) => {
    // 프리미티브 변수 타입 : number, String, boolean, undefined, null 
    // 레퍼런스 변수 타입 : array, object
    var id= req.params.id;
    if(!id) id =0;
    const books = [
        {id:0, name:"별주부전", desc: "별하나 별둘 별셋....."},
        {id:1, name:"홍길동전", desc: "붉은 길에 동전이......"}
    ];
    res.send(`
        <h1>${books[id].name}</h1>
        <h3>${books[id].desc}</h3>
    `);
})

//post 방식으로 전송 될 시
//1개의 라우터는 res는 1개 밖에 되지 않음
app.post("/join_save", (req, res, next) => {
    var userId =  req.body.userId;
    var userName =  req.body.userName;
    var wdate = new Date();
    wdate = util.isoDate(wdate);
    res.send(`<h1>welcome ${userId} </h1><br><h2>${userName}</h2><br><h3>${wdate}</h3>`);
});

