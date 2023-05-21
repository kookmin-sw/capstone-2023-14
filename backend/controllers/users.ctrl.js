import db from '../config/db.js';

const saveTaste = (req, res) => {
  const { email, style, object, preferAge, preferGender } = req.body;

  const valueList = [email, style, object, preferAge, preferGender];

  db.query(
    `INSERT INTO member_info (id, style, object, prefer_age, prefer_gender) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE
    id = ?,
    style = ?,
    object = ?,
    prefer_age = ?,
    prefer_gender = ?`,
    [...valueList, ...valueList],
    (error, result) => {
      if (error) throw error;
      res.status(201).json({ success: true });
    }
  );
};

const getUserInfo = (req, res) => {
  const { email } = req.body;

  db.query(
    `SELECT COUNT(mr.cost) as totalCount, SUM(mr.cost) as totalCost, mi.*, m.profile
    FROM member_rating AS mr
    RIGHT OUTER JOIN member_info AS mi ON mr.user_id = mi.id
    JOIN member AS m ON mi.id = m.email
    WHERE mi.id=?;
  `,
    [email],
    (error, result) => {
      if (error) throw error;

      const info = result[0];
      const buff = Buffer.from(info.profile, 'binary');
      const userInfo = {
        ...info,
        profile: buff.toString('base64'),
      };
      res.send([userInfo]);
    }
  );
};

export default { saveTaste, getUserInfo };
