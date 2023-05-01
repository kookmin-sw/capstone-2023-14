import db from '../config/db.js';
import { Blob } from 'buffer';

const getFirstImage = (req, res) => {
  const { cityList } = req.body;

  db.query(
    `SELECT c.name, cd.*
    FROM country_detail as cd, country as c
    where cd.id=c.id and c.name in (?) order by field(c.name, ?);`,
    [cityList, cityList],
    (error, result) => {
      if (error) throw error;

      let newRecommendList = [];
      result.map((city) => {
        let buff = Buffer.from(city.picture1, 'binary');
        newRecommendList.push({
          title: city.name,
          imgUrl: buff.toString('base64'),
          companion: '',
        });
      });
      res.send(newRecommendList);
    }
  );
};

const getInfo = (req, res) => {
  const { city } = req.body;

  db.query(
    `SELECT c.name, cd.*
  FROM country_detail as cd, country as c
  where cd.id=c.id and c.name = ?`,
    [city],
    (error, result) => {
      if (error) throw error;
      res.send(result[0]);
    }
  );
};

export default { getFirstImage, getInfo };
