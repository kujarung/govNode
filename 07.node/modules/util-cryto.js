const util = require("util");
const cry = require("crypto");
const randomBytesPro = util.promisify(cry.randomBytes);
const pbkdf2Pro = util.promisify(cry.pbkdf2);

module.exports = async (password) => {
    let buf = await randomBytesPro(64)
    let salt = buf.toString('base64');
    let key = await pbkdf2Pro(password, salt, 2, 64, "sha512");
    let result = key.toString('base64');
    return result;
}

