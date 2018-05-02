/* * * This will handle all the requests with regards to employee attendance * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

/* GET current attendance(today). */
router.get('/', (req, res) => {
    // by doing _id: 0, we exclude _id and __v attributes from the result set.
    // we only need attendance for current day.
    let dateTime = new Date().toISOString().substring(0, 19).replace('T', ' ');
    console.log(dateTime);
    models.Attendance.find( { time_in: { $eq: Date.now()}}, { _id: 0, eid: 1, time_in: 1, time_out: 1 }, (err, result) => {
        if (err) {
            res.status(500).send("Unable to retrieve data");
        }
        else {
            res.status(200).send(result);
        }
    });
});

router.post('/add', (req, res) => {
    // check if the params are not empty before insertion.
    if (req.body.eid != undefined && req.body.eid != "") {
        var attendanceEntry = models.Attendance({
            eid: req.body.eid,
            time_in: req.body.time_in,
            time_out: req.body.time_out
        });

        attendanceEntry.save((err) => {
           if (err) {
               console.log(err);
               res.status(400).send(err.errmsg);
           }
           else {
               res.status(201).send('Entry inserted');
           }
        });
    }
    else {
        res.status(400).send("eid can not be empty.");
    }

});


module.exports = router;
