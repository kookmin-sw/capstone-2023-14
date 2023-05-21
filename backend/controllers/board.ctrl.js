import db from '../config/db.js';

const saveBoard = (req, res) => {
  const { name, content, upload_time, update_time } = req.body;
  const query = `INSERT INTO board (writer, content, upload_time, update_time) VALUES (?,?,?,?)`;
  const values = [name, content, upload_time, update_time];

  db.query(query, values, (error, result) => {
    if (error) throw error;
    res.status(201).json({ success: true });
  });
};

const getBoardList = (req, res) => {
  const query = `SELECT b.*, m.gender, m.birth, m.mbti, m.profile FROM board as b, member as m where b.writer=m.name;`;

  db.query(query, (error, result) => {
    if (error) throw error;

    const newBoardList = result.map((post) => {
      const buff = Buffer.from(post.profile);
      return {
        ...post,
        profile: buff.toString('base64'),
      };
    });
    res.send(newBoardList);
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

const getReplyList = (req, res) => {
  const { board_id } = req.body;

  const query = `select r.*, m.profile, m.name from reply as r, member as m where board_id=? and r.replyer = m.email;`;
  const values = [board_id];

  db.query(query, values, (error, result) => {
    if (error) throw error;

    const newReplyList = result.map((reply) => {
      const buff = Buffer.from(reply.profile);
      return {
        ...reply,
        profile: buff.toString('base64'),
      };
    });
    res.send(newReplyList);
  });
};

const getUserInfo = (req, res) => {
  const { email } = req.body;

  const query = `SELECT name, gender, birth, mbti, profile FROM member WHERE email=?;`;
  const values = [email];

  db.query(query, values, (error, result) => {
    if (error) throw error;

    const info = result[0];
    const buff = Buffer.from(info.profile, 'binary');
    const userInfo = {
      ...info,
      profile: buff.toString('base64'),
    };
    res.send([userInfo]);
  });
};

export default {
  saveBoard,
  getBoardList,
  saveReply,
  getReplyList,
  getUserInfo,
};
