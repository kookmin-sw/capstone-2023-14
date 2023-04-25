const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const formidable = require('formidable');

const secretKey = process.env.SECRET_KEY;

const login = (req, res) => {
  const { email, password } = req.body;

  // mysql에서 사용자 정보 조회
  db.query('SELECT * FROM member WHERE email = ?', [email], (error, result) => {
    if (error) throw error;

    // 조회된 사용자 정보 없을 때
    if (result.length === 0) {
      res.status(401).json({ error: '등록되지 않은 사용자입니다.' });
      return;
    }

    // 조회된 사용자 정보와 입력한 비밀번호를 비교
    const user = result[0];
    bcrypt.compare(password, user.passwd, (error, isMatch) => {
      if (error) throw error;

      if (!isMatch) {
        res
          .status(401)
          .json({ error: '사용자 이름 또는 패스워드가 올바르지 않습니다.' });
      } else {
        const token = jwt.sign({ id: user.id }, secretKey);

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ success: true, userId: user.id });
      }
    });
  });
};

const signUp = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, user) => {
    if (err) throw err;

    // 이메일 중복 검사
    db.query(
      'SELECT * FROM member WHERE email = ?',
      [user.email],
      (error, result) => {
        if (error) throw error;

        if (result.length > 0) {
          res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
          return;
        }

        bcrypt.hash(user.password, 10, (error, password_hash) => {
          if (error) {
            return res.status(500).json({ error: 'Server error' });
          }

          db.query(
            'INSERT INTO member (email, passwd, name, phone_number, gender, birth, mbti, profile) VALUES (?,?,?,?,?,?,?,FROM_BASE64(?))',
            [
              user.email,
              password_hash,
              user.name,
              user.phone,
              user.gender,
              user.birth,
              user.mbti,
              user.profile,
            ],
            (error, result) => {
              if (error) throw error;
              res.status(201).json({ success: true });
            }
          );
        });
      }
    );
  });
};

const logout = (req, res) => {
  // 쿠키에서 토큰 삭제
  res.clearCookie('token');

  res.status(200).json({ success: true });
};

module.exports = { login, signUp, logout };
