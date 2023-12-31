// app.js
const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const app = express();
const port = 3000;

const dbConfig = {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10 // 연결 풀의 최대 연결 개수
};


// MariaDB 연결
const pool = mysql.createPool(dbConfig);

const sessionStore = new MySQLStore({
    checkExpirationInterval: 900000, // 15분마다 만료된 세션 정리 (밀리초)
    expiration: 86400000, // 1일 이상 사용되지 않은 세션 삭제 (밀리초)
}, pool);

// 세션 및 쿠키 설정
app.use(session({
    secret: process.env.SECRET_KEY, // 쿠키에 서명을 추가하여 보안을 강화합니다.
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        secure: true,// HTTPS를 사용하는 경우 true로 변경
        maxAge: 60 * 60 * 1000, // 세션의 유효 시간을 1시간으로 설정 (밀리초 단위) 
    }
}));

app.use(cookieParser());
app.use(favicon(path.join(__dirname, './public/favicon_io', 'favicon.ico')));

// 데이터베이스에 접속 기록을 저장하기 위한 테이블 생성
const createVisitLogsTable = `
CREATE TABLE IF NOT EXISTS visitor_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp DATETIME
  )
`;

// 연결 풀을 사용하여 테이블 생성
pool.query(createVisitLogsTable)
    .then(() => {
        console.log('visitor_log table is created or already exists.');

        // 라우트 설정
        const indexRoute = require('./routes/index');
        app.use('/', indexRoute);


        // 서버 시작
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });

    })
    .catch((err) => {
        console.error('Error creating visitor_log table:', err);
    });

// 정적 파일을 제공하기 위해 express.static 미들웨어를 사용합니다.
app.use(express.static(path.join(__dirname, 'public')));

// 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

module.exports = { app, pool };