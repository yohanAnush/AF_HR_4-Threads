/* * * This will handle all the requests with regards to employee attendance * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

/* GET all attendance entries for this month */
router.get('/month', (req, res) => {
    // by doing _id: 0, we exclude _id and __v attributes from the result set.
    // we only need attendance for current day.


    getAllAttendance()
        .then((resolve) => {
            res.send(resolve);
        })
        .catch((reject) => {
            res.send(reject)
        });
});

/* GET current attendance(today). */
router.get('/today', (req, res) => {
    // by doing _id: 0, we exclude _id and __v attributes from the result set.
    // we only need attendance for current day.
    getAllAttendance(new Date('2018-03-25'))
        .then((resolve) => {
            if (resolve.length === 0) {
                res.status(404).send({ error: 'No entries found for today.' });
            }
            else {
                res.status(200).send({ success: resolve });
            }
        })
        .catch((reject) => {
            res.status(500).send({ error: reject});
        });

});

router.post('/add', (req, res) => {
    // check if the params are not empty before insertion.
    if (req.body.eid != undefined && req.body.eid != '') {
        let attendanceEntry = models.Attendance({
            eid: req.body.eid,
            date: new Date(req.body.date),  // must be in 2018-05-12 format.
            time_in: req.body.time_in,
            time_out: req.body.time_out
        });

        attendanceEntry.save((err) => {
           if (err) {
               res.status(400).send({ error: err.errmsg });
           }
           else {
               res.status(201).send({ success: 'Entry inserted' });
           }
        });
    }
    else {
        res.status(400).send({ error: 'eid can not be empty' });
    }

});


// promises for getting data from mongodb

/*
 * return the promise body instead of assigning a new Promise to a variable,/
 * straight away. Otherwise the promise would be executed just after server starts,
 * and any update won't be caught afterwards.
 */
let getAllAttendance = (date) => {

    return new Promise((resolve, reject) => {
        let dayBeforeDate = new Date(date.getTime() - (24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        let dayAfterDate = new Date(date.getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0];

        models.Attendance.find({ date: {$gte: dayBeforeDate, $lt: dayAfterDate} }, { _id: 0, __: 0}, (err, result) => {
            if (err) {
                console.log(dayBeforeDate);
                reject(err);
            }
            else {
                console.log(dayAfterDate);
                resolve(result);
            }
        });

    });
}

module.exports = router;
