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

const saveRecord = (req, res) => {
  const {
    email,
    destination,
    rating,
    duration_start,
    duration_end,
    cost,
    record,
  } = req.body;

  const valueList = [
    email,
    destination,
    rating,
    duration_start,
    duration_end,
    record,
    cost,
  ];

  db.query(
    `INSERT INTO member_rating(user_id, country_id, rating, duration_start, duration_end, record, cost)
  VALUES (?, (select id from country where name=?), ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
  user_id=?, country_id=(select id from country where name=?),
  rating=?, duration_start=?, duration_end=?,
  record=?, cost=?;`,
    [...valueList, ...valueList],
    (error, result) => {
      if (error) throw error;
      res.status(201).json({ success: true });
    }
  );
};

export default { saveTaste, saveRecord };
