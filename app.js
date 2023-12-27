// app.js
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


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



// 데이터베이스에 접속 기록을 저장하기 위한 테이블 생성
const createVisitLogsTable = `
  CREATE TABLE IF NOT EXISTS visit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    visitor_id VARCHAR(255),
    visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    count INT DEFAULT 0
  )
`;

pool.query(createVisitLogsTable, (err) => {
    if (err) {
        console.error('Error creating visit_logs table:', err);
    } else {
        console.log('visit_logs table is created or already exists.');
    }
});

const sessionStore = new MySQLStore(dbConfig, pool);

// 세션 및 쿠키 설정
app.use(session({
    secret: process.env.SECRET_KEY, // 쿠키에 서명을 추가하여 보안을 강화합니다.
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        secure: true,// HTTPS를 사용하는 경우 true로 변경
        maxAge: 60 * 60 * 1000, // 세션의 유효 시간을 1시간으로 설정 (밀리초 단위) 
    }
}));


// 정적 파일을 제공하기 위해 express.static 미들웨어를 사용합니다.
app.use(express.static(path.join(__dirname, 'public')));

// 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 라우트 설정
const indexRoute = require('./routes/index');


app.use('/', indexRoute);

// 루트 경로에 대한 라우트
app.get('/', (req, res) => {
    // 클라이언트의 세션에 방문 여부를 확인합니다.
    if (!req.session.visited || req.session.visited === undefined) {
        // 처음 방문한 경우에만 visited 속성을 설정합니다.
        req.session.visited = true;

        // 방문자 수를 1 증가시킵니다.
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting database connection:', err);
                return res.status(500).send('Internal Server Error');
            }

            const updateVisitorCountQuery = 'UPDATE visit_logs SET count = count + 1, visit_time = CURRENT_TIMESTAMP() WHERE visitor_id = ?';
            connection.query(updateVisitorCountQuery, [req.sessionID], (err) => {
                if (err) {
                    connection.release();
                    console.error('Error updating visitor count:', err);
                    return res.status(500).send('Internal Server Error');
                }

                // 방문자 수를 조회합니다.
                const selectVisitorCountQuery = 'SELECT count FROM visit_logs WHERE visitor_id = ?';
                connection.query(selectVisitorCountQuery, [req.sessionID], (err, results) => {
                    if (err) {
                        connection.release();
                        console.error('Error selecting visitor count:', err);
                        return res.status(500).send('Internal Server Error');
                    }

                    const visitorCount = results[0] ? results[0].count : 0;

                    // 응답을 보냅니다.
                    connection.release();
                    res.send(`Welcome! You are visitor number ${visitorCount}.`);
                });
            });
        });
    } else {
        // 이미 방문한 경우에는 방문자 수를 증가시키지 않고 바로 응답합니다.
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error getting database connection:', err);
                return res.status(500).send('Internal Server Error');
            }

            const selectVisitorCountQuery = 'SELECT count FROM visit_logs WHERE visitor_id = ?';
            connection.query(selectVisitorCountQuery, [req.sessionID], (err, results) => {
                if (err) {
                    connection.release();
                    console.error('Error selecting visitor count:', err);
                    return res.status(500).send('Internal Server Error');
                }

                const visitorCount = results[0] ? results[0].count : 0;

                // 응답을 보냅니다.
                connection.release();
                res.send(`Welcome back! You are visitor number ${visitorCount}.`);
            });
        });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
