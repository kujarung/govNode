const express = require("express");
const app = express();
const port = 3000;
const pug = require('pug');



app.listen(port, () => {
    console.log("http://127.0.0.1:" + port);
});

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
})