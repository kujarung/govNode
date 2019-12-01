console.log(__dirname);
console.log(__filename);

// const interval = setImmediate ( () => {
//     console.log("hello");
// });

console.time("측정"); //

for(var i=0;i <10000; i++) {

}

console.timeEnd("측정");

console.error("error 입니다.");

const obj = {
    name :"홍길동",
    summary : {
        age : 25
    }
}
console.log(obj);
console.dir(obj);


// os
const os = require("os");
// 운영체제 정보
console.log(os.arch());
console.log(os.platform());
console.log(os.type());
console.log(os.hostname());
console.log(os.uptime());
console.log(os.release());
console.clear();

// 경로 path
console.log(os.tmpdir());
console.log(os.homedir());

//cpu정보
console.log(os.cpus());
console.log(os.cpus().length);

// 메모리 정보
console.log(os.freemem())
console.log(os.totalmem())
console.clear();

// path
const path = require("path");
const fileStr = __filename;
console.log("dirname : ", path.dirname(fileStr))
console.log("extname", path.extname(fileStr) );
console.log("basename", path.basename(fileStr) );
console.log("parse", path.parse(fileStr) );

const parse = path.parse(fileStr);
const str = path.format(parse);

console.log(str);
console.clear();

// url  
const url = require("url");
const querystring = require("querystring");
const myUrl = new URL("https://www.google.com/search?biw=1630&bih=936&ei=pPnZXfWoM5rXhwO6wKyIBw&q=i7-4870HQ+성능&oq=i7-4870HQ+성능&gs_l=psy-ab.3...4759.10321..10541...0.0..0.180.1081.0j7......0....1..gws-wiz.......0j0i30j33i160.KiPq6vLM_2g&ved=0ahUKEwj1io7M9IHmAhWa62EKHTogC3EQ4dUDCAs&uact=5");

console.log(myUrl)
console.log(url.format(myUrl));

const urlStr = "https://www.google.com/search?biw=1630&bih=936&ei=pPnZXfWoM5rXhwO6wKyIBw&q=i7-4870HQ+성능&oq=i7-4870HQ+성능&gs_l=psy-ab.3...4759.10321..10541...0.0..0.180.1081.0j7......0....1..gws-wiz.......0j0i30j33i160.KiPq6vLM_2g&ved=0ahUKEwj1io7M9IHmAhWa62EKHTogC3EQ4dUDCAs&uact=5";

const parseUrl = url.parse(urlStr);
console.log(parseUrl);
console.log(url.format(parseUrl) );
console.clear();

console.log( myUrl.searchParams);
console.log( myUrl.searchParams.keys());
console.log( myUrl.searchParams.values());

myUrl.searchParams.append("test", "abc")
myUrl.searchParams.append("test2", "abc111")
myUrl.searchParams.delete("test2")

console.log( myUrl.searchParams.keys());
console.log( myUrl.searchParams.values());
console.log( myUrl.searchParams.toString());
console.clear();

console.log(querystring.parse(parseUrl.query) );
console.clear();