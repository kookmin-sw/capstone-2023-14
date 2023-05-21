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
    `SELECT COUNT(mr.cost) as totalCount, IFNULL(SUM(mr.cost), 0) as totalCost, mem.email as id, mem.style, mem.object, mem.prefer_age, mem.prefer_gender, mem.profile
    FROM member_rating AS mr
    RIGHT OUTER JOIN (select m.email, mi.*, m.profile from member_info as mi right outer join member as m on mi.id=m.email) AS mem 
    ON mr.user_id = mem.email 
    where mem.email=?;
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
