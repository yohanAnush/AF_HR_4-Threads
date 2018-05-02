/* * * This will handle all the requests with regards to employee attendancd * * */

var express = require('express');
var router = express.Router();

/* GET current attendance(today). */
router.get('/', (req, res) => {
  res.status(201).send(JSON.stringify({"eid":213, "date":"2018-05-01", "time_in":"09:00", "time_out":"16:00"}));
});

router.post('/add', (req, res) => {
   console.log("gi");
   res.send("added");
});

module.exports = router;
