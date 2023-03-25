const express = require('express');
const app = express();

const routes = require('./routes');

// Middleware
app.use(express.json()); // JSON 형식의 요청 처리
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청 처리
app.use('/', routes);

// Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
