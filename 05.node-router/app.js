/* node express */
const express = require("express");
const app = express();
const path = require("path");
const fs = require('fs');

/* node moudlues */
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const morgan = require('morgan');
const rfs = require('rotating-file-stream')

/* 축약형 */
const log = console.log;

/* port num */
const port = 1231;
app.listen(port, ()=> { log("http://127.0.0.1:" + port); });

log(__dirname);
log(__filename);
log( path.join(__dirname, "public") );

/* express setting */
app.use("/", express.static(  path.join(__dirname, "public") ));
app.use(bodyParser.urlencoded({}));

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

app.use("/board", boardRouter);
app.use("/admin", adminRouter);
app.use("/rest" , restRouter );
app.use("/api"  , apiRouter );