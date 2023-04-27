import express from 'express';
import user from '../controllers/user.ctrl.js';
import chat from '../controllers/openai.ctrl.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/api/login', user.login);
router.post('/api/signup', user.signUp);
router.post('/api/logout', user.logout);

router.post('/chat', chat);

export default router;
