import db from '../config/db.js';
import { Blob } from 'buffer';

const destination = (req, res) => {
  const { city } = req.body;

  db.query(
    `SELECT c.name, cd.*
    FROM country_detail as cd, country as c
    where cd.id=c.id and c.name = ?`,
    [city],
    (error, result) => {
      if (error) throw error;

      //res.send(result[0].picture1);
      // console.log(result[0].picture1);
      //   let blob = new Blob([new ArrayBuffer(result[0].picture1)], {
      //     type: 'image/png',
      //   });
      //   let blob = new ArrayBuffer(result[0].picture1);
      let buff = Buffer.from(result[0].picture1, 'binary');
      res.send(buff.toString('base64'));
    }
  );
};

export default destination;
