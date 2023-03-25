const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // JSON 형식의 요청 처리
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 요청 처리

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
