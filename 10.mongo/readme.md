# 환경 변수 등록
1. 설치경로 : c:/program files/MongoDB/servers/version/db

# 몽고 데몬 띄우기

~~~~bash
mongod --port 15000 -dbpath=c:/mongodb/db1
~~~~

# 몽고 쉘 띄우기
~~~~shell script
mongo --port 15000
~~~~

# 데이터베이스 접근
~~~~shell script
show db
use sample
db.createCollection("user") #collection 생성
~~~~

# collection 에서 도큐먼트 사용
~~~~ shell script
# SELECT, INSERT ,UPDATE, DELETE
# INSERT 
db.users.insertOne({'name':'홍길동','grade':9})
db.users.insertMany([
    {name : "홍길순", grade : 9},
    {name : "홍길만", grade : 8, company: {name:"홍기업", tel:"00000000"}}
])


# SELECT
# SLECT * from users
db.users.find()

# SELECT * FROM users WHERE name = '홍길동'
db.users.find({name:'홍길동'})

# SELECT * FROM users WHERE name="홍길동" AND GRADE > 8
db.users.find( {name: "홍길동", grade: {$gt: 8}})

# UPDATE
## db.collection.updateOne( {조건}, {데이터} )
db.users.updateOne( { 
    name: '홍길동'
}, { 
    $set:{grade: 5}
});

db.users.updateMany( { 
    name: '홍길동'
}, { 
    $set:{grade: 5}
});

# DELETE
db.users.deleteOne({name:"홍길동"});

db.users.deleteMany({name:"홍길동"});
~~~~

# Replica 만들기
~~~ bash

# 터미널 창을 3개 만들고 각각의 창에서 아래와 같이 실행
mongod --port 15000 --dbpath /Users/gujalyong/Documents/dev/mongodb/db1 --replSet replica
mongod --port 15001 --dbpath /Users/gujalyong/Documents/dev/mongodb/db2 --replSet replica
mongod --port 15002 --dbpath /Users/gujalyong/Documents/dev/mongodb/db3 --replSet replica

# 쉐을 열어서
mongo --port 15000
conifg = {
    _id : 'repl',
    members : [{
        {_id:0, host: "localhost:15000"},
        {_id:1, host: "localhost:15001"},
        {_id:2, host: "localhost:15002"},
    }]
}

rs.initiate(config)

~~~

# Sharding
~~~ bash
mkdir db1 db2 db3 config1 config2

#db1
mongod --port 15000 --dbpath /Users/gujalyong/Documents/dev/mongodb/db1 --shardsvr
mongod --port 15001 --dbpath /Users/gujalyong/Documents/dev/mongodb/db2 --shardsvr
mongod --port 15002 --dbpath /Users/gujalyong/Documents/dev/mongodb/db3 --shardsvr

mongo --port 25000 --dbpath /Users/gujalyong/Documents/dev/mongodb/config1 --configsvr
--repleSet reple

mongo --port 25001 --dbpath /Users/gujalyong/Documents/dev/mongodb/config2 --configsvr
--repleSet reple

mongo --port 25000

conifg = {
    _id : 'reple',
    members : [{
        {_id:0, host: "localhost:25000"},
        {_id:1, host: "localhost:25001"},
    }]
}

rs.initiate(config)

mongos --configdb reple/localhost:2500, localhost:25001
--port 26000

mongo --port 26000
sh.addShard("replicaname/localhost:15000");
sh.addShard("replicaname/localhost:15001");
sh.addShard("replicaname/localhost:15002");
sh.status(); #shard server 상태 확인
~~~