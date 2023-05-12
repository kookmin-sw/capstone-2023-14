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
    `SELECT COUNT(m.cost) as totalCount, SUM(m.cost) as totalCost, i.*
    FROM member_rating AS m
    JOIN member_info AS i ON m.user_id = i.id
    WHERE i.id = ?;
  `,
    [email],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
};

export default { saveTaste, getUserInfo };
