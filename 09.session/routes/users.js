var express = require('express');
var router = express.Router();
var User = require("../models").User;
var salt = require("../models").salt;
var crypto = require("crypto");

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login');
});

router.get("/join", (req, res, next) => {
  console.log("join")
  res.render('join');
})

router.post("/join", async (req, res, next) => {
  var result = await User.create({
    userid : req.body.userid,
    userpw : crypto.createHash('sha512').update(req.body.userpw + salt).digest('base64'),
    username : req.body.username,
  });
  console.log(crypto.createHash('sha512').update(req.body.userpw + salt).digest('base64'));
  
  res.json(result);
})

module.exports = router;
