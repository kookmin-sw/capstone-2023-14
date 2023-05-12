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

const getBoardList = (req, res) => {
  const query = `SELECT b.*, m.gender, m.birth, m.mbti FROM board as b, member as m where b.writer=m.email;`;

  db.query(query, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
};

const saveReply = (req, res) => {
  const { board_id, email, content, upload_time, update_time } = req.body;
  const query = `INSERT INTO reply (board_id, replyer, content, upload_time, update_time) VALUES (?, ?, ?, ?, ? )`;
  const values = [board_id, email, content, upload_time, update_time];

  db.query(query, values, (error, result) => {
    if (error) throw error;
    res.status(201).json({ success: true });
  });
};
export default { saveBoard, getBoardList, saveReply };
