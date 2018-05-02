/* * * This will handle all the requests with regards to employee attendance * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

/* GET current attendance(today). */
router.get('/', (req, res) => {
    res.status(200).send(JSON.stringify({"eid":213, "date":"2018-05-01", "time_in":"09:00", "time_out":"16:00"}));
});

router.post('/add', (req, res) => {
    // check if the params are not empty before insertion.
    if (req.body.eid != undefined) {
        var attendanceEntry = models.Attendance({
            eid: req.body.eid,
            time_in: req.body.time_in,
            time_out: req.body.time_out
        });

        attendanceEntry.save((err) => {
           if (err) {
               console.log(err);
           }
           else {
               console.log('Inserted');
           }
        });
    }

    res.send("added");
});


module.exports = router;
