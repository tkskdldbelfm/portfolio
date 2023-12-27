
// routes/index.js
const express = require('express');
const router = express.Router();
const { pool } = require('../app'); // app.js에서 가져옴



router.get('/', async (req, res) => {
    try {
        if (!req.session.visited) {
            // Using pool.query directly without calling getConnection
            await pool.query('INSERT INTO visitor_log (timestamp) VALUES (NOW())');

            // 세션에 방문 여부 표시
            req.session.visited = true;

            res.render('index'); // 또는 res.send('Welcome to the website!');
        } else {
            res.render('index'); // 또는 res.send('Welcome to the website!');
        }
    } catch (error) {
        console.error('Error while updating visitor count:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
