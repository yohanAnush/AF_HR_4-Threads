/* * * This will handle all the requests with regards to employee * * */

const express = require('express');
const router = express.Router();

/* GET Employee Detaila. */
router.get('/', (req, res) => {
   var emp = [{"eid":108, "email":"amal@gmail.com", "name":"Dr. A.D. Perera", "gender":"Male","position":"Doctor", "department":"OPD", "date_joined":"2018-01-01"},
			{"eid":110, "email":"kamal@gmail.com", "name":"Dr. K.S. Perera", "gender":"Male","position":"Doctor", "department":"OPD", "date_joined":"2017-08-01"}];
  res.status(200).send(JSON.stringify(emp));
});

router.post('/add', (req, res) => {
   console.log("gi");
   res.send("added");
});

module.exports = router;
