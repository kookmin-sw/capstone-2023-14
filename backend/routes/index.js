import express from 'express';
import auth from '../controllers/auth.ctrl.js';
import users from '../controllers/users.ctrl.js';
import chat from '../controllers/openai.ctrl.js';
import recommend from '../controllers/recommend.ctrl.js';
import record from '../controllers/record.ctrl.js';
import board from '../controllers/board.ctrl.js';

const router = express.Router();

router.post('/api/login', auth.login);
router.post('/api/signup', auth.signUp);
router.post('/api/logout', auth.logout);

router.post('/chat', chat);

router.post('/api/get-image', recommend.getFirstImage);
router.post('/api/get-info', recommend.getInfo);

router.post('/api/hashtag-taste', users.saveTaste);
router.post('/api/get-userInfo', users.getUserInfo);

router.post('/api/record-write', record.saveItinerary);
router.get('/api/get-cityList', record.getCityList);
router.post('/api/get-recordList', record.getItineraryList);

router.post('/api/board-write', board.saveBoard);
router.get('/api/get-boardList', board.getBoardList);

export default router;
