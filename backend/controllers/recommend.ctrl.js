import db from '../config/db.js';

const getFirstImage = (req, res) => {
  const { cityList } = req.body;

  db.query(
    `SELECT c.name, cd.*
    FROM country_detail as cd, country as c
    where cd.id=c.id and c.name in (?) order by field(c.name, ?);`,
    [cityList, cityList],
    (error, result) => {
      if (error) throw error;

      try {
        const newRecommendList = result.map((city) => {
          let buff = Buffer.from(city.picture1, 'binary');
          return {
            ...city,
            imgUrl: buff.toString('base64'),
          };
        });
        res.send(newRecommendList);
      } catch (e) {
        console.log(e);
      }
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

      try {
        const info = result[0];
        let buff1 = Buffer.from(info.picture1, 'binary');
        let buff2 = Buffer.from(info.picture2, 'binary');
        let buff3 = Buffer.from(info.picture3, 'binary');

        const infoDetail = {
          ...info,
          imgUrl1: buff1.toString('base64'),
          imgUrl2: buff2.toString('base64'),
          imgUrl3: buff3.toString('base64'),
        };
        res.send(infoDetail);
      } catch (e) {
        console.log(e);
      }
    }
  );
};

export default { getFirstImage, getInfo };
