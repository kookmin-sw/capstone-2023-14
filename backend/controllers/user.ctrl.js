const bcrypt = require('bcrypt');
const db = require('../config/db');

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

      isMatch = password === user.passwd ? true : false;

      if (isMatch) {
        res.status(200).json({ message: '로그인 성공' });
      } else {
        res
          .status(401)
          .json({ message: '사용자 이름 또는 패스워드가 올바르지 않습니다.' });
      }
    });
  });
};

module.exports = { login };
