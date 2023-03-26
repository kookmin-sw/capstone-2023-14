const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const routes = require('./routes');

// Middleware
app.use(express.json()); // JSON 형식의 요청 처리
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청 처리
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
