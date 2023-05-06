import db from '../config/db.js';

const saveTaste = (req, res) => {
  const { email, style, object, preferAge, preferGender } = req.body;

  const valueList = [email, style, object, preferAge, preferGender];

  db.query(
    `INSERT INTO member_info (id, style, object, prefer_age, prefer_gender) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE
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

export default { saveTaste };
