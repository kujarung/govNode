// crypto
const cry = require("crypto");
let sha512 = cry.createHash("sha512").update("12345").digest("base64");
let sha513 = cry.createHash("sha512").update("54321").digest("base64");
let sha514 = cry.createHash("sha512").update("54321").digest("base64");


// util
const util = require("util");
const randomBytesPro = util.promisify(cry.randomBytes);
const pbkdf2Pro = util.promisify(cry.pbkdf2);

/* randomBytesPro(64).then((buf) => {
    const salt = buf.toString('base64');
    console.log(salt);
    return pbkdf2Pro("1234", "ryan", 2, 64, "sha512");
}).then((key)=>{
    console.log(key.toString('base64'))
}).catch( (err) => {
    console.log(err);
});
 */

// randomBytesPro(64).then((buf) => {
//     const salt = buf.toString('base64');
//     console.log(salt);
//     return pbkdf2Pro("1234", "ryan", 2, 64, "sha512");
// }).then((key)=>{
//     console.log(key.toString('base64'))
// }).catch( (err) => {
//     console.log(err);
// });

const password = "1234";
const crytoSalt = require('./modules/util-cryto')(password);