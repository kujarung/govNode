const http = require("http");
const cluster = require("cluster");

let cpus = require("os").cpus();
let cpuCnt = cpus.length;

if( cluster.isMaster ) {
    console.log("마스터임")
    for(let i=0; i < cpuCnt; i++) {
        cluster.fork(); //워커를 만든다.
        console.log("워커 생성")
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`${worker.precess.pid} 번 워커가 사망하였습니다.`);
        cluster.fork();
    });
} 

else {
    http.createServer( (req, res) => {
        console.log(process.pid + "구동");
        res.end("<h1>서버 응답</h1>");
    }).listen(3012);
    console.log(process.pid + "서버가 실행 되었습니다.");
}