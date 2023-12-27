
// routes/index.js
const express = require('express');
const router = express.Router();
const pool = require('../app').pool; // app.js에서 가져옴



router.get('/', (req, res) => {
    if (!req.session.visited) {
        // 방문자 수 증가 및 방문 기록
        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to MariaDB:', err);
                return res.status(500).send('Internal Server Error');
            }

            connection.query('INSERT INTO visitor_log (timestamp) VALUES (NOW())', (error) => {
                connection.release();

                if (error) {
                    console.error('Error while updating visitor count:', error);
                    return res.status(500).send('Internal Server Error');
                }

                // 세션에 방문 여부 표시
                req.session.visited = true;

                res.render('index'); // 또는 res.send('Welcome to the website!');
            });
        });
    } else {
        res.render('index'); // 또는 res.send('Welcome to the website!');
    }
});


module.exports = router;
