import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import db from '../config/db.js';

const secretKey = process.env.HASH_SECRET_KEY;

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
        const token = jsonwebtoken.sign({ id: user.id }, secretKey);

        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ success: true, userId: user.id, token: token });
      }
    });
  });
};

const signUp = (req, res) => {
  const { email, passwd, name, phone, gender, birthday, mbti, profile } =
    req.body;

  let newProfile = null; // profile string 타입
  try {
    if (profile !== '') {
      const [, base64Data] = profile.split(',');
      newProfile = Buffer.from(base64Data, 'base64');
    }
  } catch (e) {
    console.log(e);
  }

  // 이메일 중복 검사
  db.query('SELECT * FROM member WHERE email = ?', [email], (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.status(409).json({ error: '이미 존재하는 이메일입니다.' });
      return;
    }

    bcrypt.hash(passwd, 10, (error, password_hash) => {
      if (error) {
        return res.status(500).json({ error: 'Server error' });
      }

      db.query(
        'INSERT INTO member (email, passwd, name, phone_number, gender, birth, mbti, profile) VALUES (?,?,?,?,?,?,?,?)',
        [email, password_hash, name, phone, gender, birthday, mbti, newProfile],
        (error, result) => {
          if (error) throw error;
          res.status(201).json({ success: true });
        }
      );
    });
  });
};

const logout = (req, res) => {
  // 쿠키에서 토큰 삭제
  res.clearCookie('token');

  res.status(200).json({ success: true });
};

export default { login, signUp, logout };
