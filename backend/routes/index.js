const express = require('express');
const router = express.Router();

const user = require('../controllers/user.ctrl');
const openai = require('../controllers/openai.ctrl.js');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/login', user.login);
router.post('/api/signup', user.signUp);
router.post('/api/logout', user.logout);

router.post('/chat', openai.chat);

module.exports = router;
