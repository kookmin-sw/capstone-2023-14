import db from '../config/db.js';

const saveBoard = (req, res) => {
  const { email, content, upload_time, update_time } = req.body;
  const query = `INSERT INTO board (writer, content, upload_time, update_time) VALUES (?,?,?,?)`;
  const values = [email, content, upload_time, update_time];

  db.query(query, values, (error, result) => {
    if (error) throw error;
    res.status(201).json({ success: true });
  });
};

export default { saveBoard };
