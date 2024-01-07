
// routes/index.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { pool } = require('../app'); // app.js에서 가져옴



// routes/index.js
router.get('/', async (req, res) => {
    try {
        // 클라이언트에서 visited 쿠키를 확인
        const visitedCookie = req.cookies.visited;

        if (!visitedCookie) {
            // Check if it's a crawler
            const userAgent = req.get('User-Agent').toLowerCase();
            const isCrawler = userAgent.includes('bot') || userAgent.includes('crawler') || userAgent.includes('spider');

            // Using pool.query directly without calling getConnection
            if (isCrawler) {
                await pool.query("INSERT INTO visitor_log (timestamp) VALUES ('1111-11-11 11:11:11')");
            } else {
                await pool.query('INSERT INTO visitor_log (timestamp) VALUES (NOW())');
            }

            // 세션에 방문 여부 표시
            req.session.visited = true;

            // 쿠키에도 방문 여부 표시
            res.cookie('visited', true, { maxAge: 60 * 60 * 1000 }); // 1시간 동안 유효

            res.render('index');
        } else {
            res.render('index');
        }
    } catch (error) {
        console.error('Error while updating visitor count:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;