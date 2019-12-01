/* node express */
/* node moudlues */
// body-parser는 미들 웨어
// 미들웨어란 req - res 사이에서 데이터를 처리하는 것
/* 축약형 */
/* port num */
const express = require("express"), app = express(), path = require("path"), fs = require('fs'),
    httpErrors = require("http-errors"), bodyParser = require("body-parser"),
    methodOverride = require('method-override'), morgan = require('morgan'), rfs = require('rotating-file-stream'),
    log = console.log, port = 1231;
app.listen(port, ()=> { log("http://127.0.0.1:" + port); });

log(__dirname);
log(__filename);
log( path.join(__dirname, "public") );

/* express setting */
app.use("/", express.static(  path.join(__dirname, "public") ));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

/* method-Override setting */
app.use(methodOverride('X-HTTP-Method')) //          Microsoft
app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
app.use(methodOverride('X-Method-Override')) //      IBM
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method;
    }
}));

/* pug setting */
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views") );
app.locals.pretty = true;

/* morgan setting */
const logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
})
app.use(morgan('combined', { stream: accessLogStream }));

/* Router 셋팅 */
const boardRouter = require( path.join(__dirname, "router/board") );
const adminRouter = require( path.join(__dirname, "router/admin") );
const restRouter  = require( path.join(__dirname, "router/rest") );
const apiRouter   = require( path.join(__dirname, "router/api") );
const seqRouter   = require( path.join(__dirname, "router/seq") );
app.use("/board", boardRouter);
app.use("/admin", adminRouter);
app.use("/rest" , restRouter );
app.use("/api"  , apiRouter );
app.use("/seq"  , seqRouter );

/* 예외처리 */
app.use((req, res, next)=>{
  next(httpErrors(404));
})

app.use((err, req, res, next)=>{
  res.locals.message = err.message
  res.locals.err = err;
  res.render("err");
});

