const fs = require("fs");

let txt = "아버지를 아버지라.... 용와이 나의 간을.....2"
fs.writeFileSync("./readme.txt", txt);
const result = fs.readFileSync("./readme.txt");
console.log(result.toString() );


/* 

fs.readFile();
fs.writeFile();
fs.open();
fs.mkdir();
fs.opendir();
fs.rename();
fs.unlink();
fs.copyFile();
*/