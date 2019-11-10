## SQL(Structure Query Language)문
## 1. 데이터 삽입
~~~sql
insert into users(memberName, age, wdate ) values("홍길동", 27, "2019-11-03 10:20:25" );
insert into users set memberName='홍길만', age = 25, wdate = '2019-11-03 10:12:25';
~~~

## 2. 데이터 가져오기
~~~sql
SELECT * FROM users;
~~~

## 3.데이터 삭제하기
~~~sql
DELETE FROM users WHERE ID = 2;
DELETE FROM USERE WHERE ID > 2000;
/* (%는 와일드 카드), '%길동%' => 길동 앞,뒤에 어떠한 문자가 와도 상관 없음 */
DELETE FROM USERS WHERE ID > 2000 AND USERNAME LIKE '%길동%';
DELETE FROM USERS WHERE USERNAME ='홍길동';
~~~

## 4.데이터 수정하기
~~~sql
UPDATE 테이블명 SET 필드명="값" WHERE 필드명="값";
UPDATE USERS SET USERNAME ='홍길동', AGE='32' WHERE ID = 3;
~~~

