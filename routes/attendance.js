/* * * This will handle all the requests with regards to employee attendance * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

/* GET all attendance entries for this month */
router.get('/month', (req, res) => {
    // by doing _id: 0, we exclude _id and __v attributes from the result set.
    // we only need attendance for current day.
    /*let currentDate = new Date(new Date().toISOString().substring(0, 19).split('T')[0]); // ex: 2018-05-21
    let currentDateWithoutDay = currentDate.getFullYear() + '-' + currentDate.getMonth();   // 2018-05

    models.Attendance.find( {}, { _id: 0, __v: 0 }, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Unable to retrieve data' });
        }
        else {
            // we iterate through the result, and if the time_in's date and current date don't match,
            // we remove that entry from the result.
            let filteredResult = [];
            for (let i = 0; i < result.length; i++) {
                let dbDate = new Date(new Date(result[i].time_in.getTime()).toISOString().split('T')[0]); // take only the date from date and time.
                let dbDateWithoutDay = dbDate.getFullYear() + '-' + dbDate.getMonth();

                if (currentDateWithoutDay === dbDateWithoutDay) {
                    filteredResult.push(result[i]);
                    //result.splice(i, 1);    // starting from index i, remove 1 entry.
                }
            }
            res.status(200).send({ success: filteredResult });
        }
    });*/

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
    getAllAttendance(new Date('2018-03-21'))
        .then((resolve) => {
            res.send(resolve);
        })
        .catch((reject) => {
            res.send(reject)
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
        models.Attendance.find( {date: { $gte: ISODate(new Date(date.getTime()-(24 * 60 * 60 * 1000))), $lt: ISODate(new Date(date.getTime()+(24 * 60 * 60 * 1000)))} },
                                {_id: 0, __v: 0}, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });

    });
}

module.exports = router;
