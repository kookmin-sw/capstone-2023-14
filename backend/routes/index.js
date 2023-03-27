const express = require('express');
const router = express.Router();

const user = require('../controllers/user.ctrl');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/login', user.login);
router.post('/api/signup', user.signUp);

module.exports = router;
