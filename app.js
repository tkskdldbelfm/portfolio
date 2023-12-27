// app.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 정적 파일을 제공하기 위해 express.static 미들웨어를 사용합니다.
app.use(express.static(path.join(__dirname, 'public')));

// 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 라우트 설정
const indexRoute = require('./routes/index');
//const workRoute = require('./routes/work');
//const aboutmeRoute = require('./routes/aboutme');


app.use('/', indexRoute);
//app.use('/work', workRoute);
//app.use('/aboutme', aboutmeRoute);



// 서버 시작
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
