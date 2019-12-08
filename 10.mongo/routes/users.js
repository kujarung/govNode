var express = require('express');
var router = express.Router();
var User = require('../schemas/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const user = new User({
    username: "호옹길4",
    userid: "ho3"
  });
  user.save().then((result) => {
    res.json(result)
  }).catch( (err) => {
    next(err)
  } )
});


module.exports = router;
