const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const secretKey = process.env.SECRET_KEY;

const login = (req, res) => {
  const { email, password } = req.body;

  // mysql에서 사용자 정보 조회
  db.query('SELECT * FROM member WHERE email = ?', [email], (error, result) => {
    if (error) throw error;

    // 조회된 사용자 정보 없을 때
    if (result.length === 0) {
      res.status(401).json({ message: '등록되지 않은 사용자입니다.' });
      return;
    }

    // 조회된 사용자 정보와 입력한 비밀번호를 비교
    const user = result[0];
    bcrypt.compare(password, user.passwd, (error, isMatch) => {
      if (error) throw error;

      if (!isMatch) {
        res
          .status(401)
          .json({ message: '사용자 이름 또는 패스워드가 올바르지 않습니다.' });
      } else {
        const token = jwt.sign({ id: user.id }, secretKey);

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: '로그인 성공', userId: user.id });
      }
    });
  });
};

module.exports = { login };
