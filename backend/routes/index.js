const express = require('express');
const router = express.Router();

const user = require('../controllers/user.ctrl');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/login', user.login);

module.exports = router;
