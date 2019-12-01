# express-generator 설정

# express  프로젝트를 만들 폴더로 이동하여 터미널 창에서 아래와 같이 실행
express folderName --views=pug
express react-test --views=react

# 프로젝트가 생성 된 폴더로 이동하여 package.json의 참조 모듈 일괄 설치
npm i

# bin/www : 시작지점
# 각종 middle ware 설치
npm i morgan
npm i http-errors
npm i sequelize

npm i mysql2
npm i rotating-file-stream
npm i multer
npm i express-session
npm i session-file-store

# 한번만 설치하는 글로벌 모듈
npm i -g sequelize-cli
npm i -g supervisor
npm i -g pm2