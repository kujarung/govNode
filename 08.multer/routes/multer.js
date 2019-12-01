var express = require('express');
var router = express.Router();
var multer  = require('multer');
const path = require('path');
const fs = require("fs");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, getPath())
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    var saveFile = getFile(file.originalname); // {} -> 1912-timestamp-99.jpg
    cb(null, saveFile.filename   )
  }
})

var upload = multer({ storage: storage})

function getPath() {
  var newPath = path.join(__dirname, "../public/uploads/" + makePath() );
  if(!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath);
  } 
  return newPath; //1912
}

function getFile(oriFile) {
  // oriFile => "sample.jpg"
  var ext = path.extname(oriFile); //.jpg
  var fName = path.basename(oriFile, ext); //sample
  var f1 = makePath(); // 1912
  var f2 = Date.now();  // timeStamp
  var f3 = Math.floor( Math.random() * 90 + 10 ); // 0  - 99
  var filename = f1 + '-' + f2 + '-' + f3 + ext;
  return {oriFile, ext, fName, filename};
}

 function makePath() {
  var d = new Date();
  var year = (d.getFullYear() + "").substr(2);
  var month = (d.getMonth() + 1 < 10) ? 0 + (d.getMonth + 1 ) : d.getMonth() + 1;
  return year + month;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("여기예요.")
  res.render('multer-list', { title: 'Express' });
});

router.post("/", upload.single('img'), (req, res, next) => {
  res.send("저장 되었습니다." + req.file.filename);
})
module.exports = router;
