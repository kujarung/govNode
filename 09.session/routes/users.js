var express = require('express');
var router = express.Router();
var User = require("../models").User;
var salt = require("../models").salt;
var crypto = require("crypto");

/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.send("회원 입니다.<p><href='/users/logout'>로그이 아웃</p>")
  res.render('login');
});

router.get("/join", (req, res, next) => {
  console.log("join")
  res.render('join');
})

router.post("/login", async(req, res, next) => {
  console.log("킹들어 오나?")
  var result = await User.findOne({
    where : {
      userid: req.body.userid,
      userpw: crypto.createHash("sha512").update(req.body.userpw + salt).digest("base64")
    }
  })

  if(result) {
    console.log("로그인");
    // 로그인 성공 시
    req.session.user = {};
    req.session.user.id = result.id;
    req.session.user.userid = result.userid;
    req.session.user.username = result.username;
    res.redirect("/users");
    res.json(req.session.user)
  } else {
    // 로그인 실패 시
    res.json("로그인에 실패했습니다.");
  }
})


router.post("/join", async (req, res, next) => {
  var result = await User.create({
    userid : req.body.userid,
    userpw : crypto.createHash('sha512').update(req.body.userpw + salt).digest('base64'),
    username : req.body.username,
  });
  console.log(crypto.createHash('sha512').update(req.body.userpw + salt).digest('base64'));
  
  res.json(result);
  if(result.id) {
    res.redirect("/users");
  } else {
    res.send("가입에 실패하였습니다.");
  }
})

router.get('/logout', (req, res, next)=> {
  req.session.destroy(()=> {
    res.redirect("/users")
  })
  res.redirect("/users")
});

module.exports = router;
