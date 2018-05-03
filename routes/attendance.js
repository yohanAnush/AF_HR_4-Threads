/* * * This will handle all the requests with regards to employee attendance * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

/* GET all attendance entries */
router.get('/month', (req, res) => {
    // by doing _id: 0, we exclude _id and __v attributes from the result set.
    // we only need attendance for current day.
    let currentDate = new Date(new Date().toISOString().substring(0, 19).split('T')[0]); // ex: 2018-05-21
    let currentDateWithoutDay = currentDate.getFullYear() + '-' + currentDate.getMonth();   // 2018-05


    models.Attendance.find( {}, { _id: 0, eid: 1, time_in: 1, time_out: 1 }, (err, result) => {
        if (err) {
            res.status(500).send("Unable to retrieve data");
        }
        else {
            // we iterate through the result, and if the time_in's date and current date don't match,
            // we remove that entry from the result.
            let filteredResult = [];
            for (var i = 0; i < result.length; i++) {
                let dbDate = new Date(new Date(result[i].time_in.getTime()).toISOString().split('T')[0]); // take only the date from date and time.
                let dbDateWithoutDay = dbDate.getFullYear() + '-' + dbDate.getMonth();

                if (currentDateWithoutDay === dbDateWithoutDay) {
                    filteredResult.push(result[i]);
                    //result.splice(i, 1);    // starting from index i, remove 1 entry.
                }
            }
            res.status(200).send(filteredResult);
        }
    });
});


/* GET current attendance(today). */
router.get('/today', (req, res) => {

    // by doing _id: 0, we exclude _id and __v attributes from the result set.
    // we only need attendance for current day.
    let currentDate = new Date().toISOString().substring(0, 19).split('T')[0]; // ex: 2018-05-21

    models.Attendance.find( {}, { _id: 0, eid: 1, time_in: 1, time_out: 1 }, (err, result) => {
        if (err) {
            res.status(500).send("Unable to retrieve data");
        }
        else {
            // we iterate through the result, and if the time_in's date and current date don't match,
            // we remove that entry from the result.
            let filteredResult = [];
            for (var i = 0; i < result.length; i++) {
                let dbDate = new Date(result[i].time_in.getTime()).toISOString().split('T')[0]; // take only the date from date and time.

                if (currentDate === dbDate) {
                    filteredResult.push(result[i]);
                    //result.splice(i, 1);    // starting from index i, remove 1 entry.
                }
            }
            res.status(200).send(filteredResult);
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
