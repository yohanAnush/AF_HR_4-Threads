/* * * This will handle all the requests with regards to employee attendancd * * */

const express = require('express');
const router = express.Router();

/* GET current attendance(today). */
router.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({"eid":213, "date":"2018-05-01", "time_in":"09:00", "time_out":"16:00"}));
});

router.post('/add', (req, res) => {
   console.log("gi");
   res.send("added");
});

module.exports = router;
