// routes/index.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    if (!req.session.visited) {
        // 방문자 수 증가 및 방문 기록
        try {
            const connection = await pool.getConnection();
            await connection.query('INSERT INTO visitor_log (timestamp) VALUES (NOW())');
            connection.release();

            // 세션에 방문 여부 표시
            req.session.visited = true;
        } catch (error) {
            console.error('Error while updating visitor count:', error);
        }
    }

    res.render('index'); // 또는 res.send('Welcome to the website!');
});


module.exports = router;
