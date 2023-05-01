import express from 'express';
import auth from '../controllers/auth.ctrl.js';
import users from '../controllers/users.ctrl.js';
import chat from '../controllers/openai.ctrl.js';
import destination from '../controllers/recommend.ctrl.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/login', auth.login);
router.post('/api/signup', auth.signUp);
router.post('/api/logout', auth.logout);

router.post('/chat', chat);
router.post('/api/recommend', destination);

router.post('/api/hashtag-taste', users.saveTaste);
router.post('/api/record-write', users.saveRecord);

export default router;
