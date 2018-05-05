/* * * This will handle all the requests with regards to employee shifts and work hours * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
    console.log(req.body.shifts.monday.time_start);
    let shiftEntry = models.Shift({
        eid: req.body.eid,
        shifts: {
            monday: { time_start: req.body.shifts.monday.time_start, time_end: req.body.shifts.monday.time_end },
            tuesday: { time_start: req.body.shifts.tuesday.time_start, time_end: req.body.shifts.tuesday.time_end },
            wednesday: { time_start: req.body.shifts.wednesday.time_start, time_end: req.body.shifts.wednesday.time_end },
            thursday: { time_start: req.body.shifts.thursday.time_start, time_end: req.body.shifts.thursday.time_end },
            friday: { time_start: req.body.shifts.friday.time_start, time_end: req.body.shifts.friday.time_end },
            saturday: { time_start: req.body.shifts.saturday.time_start, time_end: req.body.shifts.saturday.time_end },
            sunday: { time_start: req.body.shifts.sunday.time_start, time_end: req.body.shifts.sunday.time_end }
        }
    });

    shiftEntry.save((err) => {
        if (err) {
            res.status(400).send({ error: err.errmsg });
        }
        else {
            res.status(201).send({ success: 'Entry inserted' });
        }
    });
});

router.get('/', (req, res) => {
    models.getAll(models.Shift, {})
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

module.exports = router;