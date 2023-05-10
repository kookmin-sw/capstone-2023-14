import db from '../config/db.js';

const getCityList = (req, res) => {
  db.query(`SELECT name FROM country ORDER BY name;`, (error, result) => {
    if (error) throw error;
    const cityList = result.map((city) => {
      return city.name;
    });
    res.send(cityList);
  });
};

const saveItinerary = (req, res) => {
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

const getItineraryList = async (req, res) => {
  const { email } = req.body;
  db.query(
    `SELECT * FROM member_rating WHERE user_id=?;`,
    [email],
    (error, result) => {
      if (error) throw error;
      res.send(result);
    }
  );
};

export default { saveItinerary, getCityList, getItineraryList };
