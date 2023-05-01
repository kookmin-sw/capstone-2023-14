import db from '../config/db.js';

const saveTaste = (req, res) => {
  const { email, style, object, preferAge, preferGender } = req.body;
  console.log(email, style, object, preferAge, preferGender);

  db.query(
    'INSERT INTO member_info (id, style, object, prefer_age, prefer_gender) VALUES (?,?,?,?,?)',
    [email, style, object, preferAge, preferGender],
    (error, result) => {
      if (error) throw error;
      res.status(201).json({ success: true });
    }
  );
};

export default saveTaste;
