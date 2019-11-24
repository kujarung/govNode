const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const port = 3123;
app.listen(port, ()=> { console.log("http://127.0.0.1:" + port); });

/* pug setting */
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views") );
app.locals.pretty = true;


app.use("/", express.static(  path.join(__dirname, "public") ));

app.use("/user/get", getData);
app.use("/user/post", postData);
app.use("/user/delete", deleteData);
app.use("/user/put", putData);

const {User} = require(path.join(__dirname, "/models/User"))

async function getData(req, res, next) {
    let result = await User.findAll({
        order: [["id", "desc" ]]
    });
    res.render("crud", {result : result} );
}

async function postData(req, res, next) {
    let insertResult = await User.create({
        username : req.body.username
    });
    res.redirect("/user/get");
}

async function deleteData(req, res, next) {
    console.log(req.body.del_id)
    let result = await User.destroy({
        where : {
            id : req.body.del_id
        }
    });
    res.redirect("/user/get");
}

async function putData(req, res, next) {
    let result = await User.update({
        username : req.body.username,
    },{
        where : {
            id : req.body.id
        }
    })
    res.redirect("/user/get");
}