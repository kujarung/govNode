const crypto = require("crypto");

const cipher = crypto.createCipher("aes-256-cbc", "my-key");

let result = cipher.update("아버지를 아버지라.....", "utf8", "base64" );

result += cipher.final("base64");

console.log(result);

const deciper = crypto.createDecipher("aes-256-cbc", "my-key");

let resultDeciper = deciper.update(result, "base64", "utf8");

resultDeciper+= deciper.final("utf8");

console.log(resultDeciper);