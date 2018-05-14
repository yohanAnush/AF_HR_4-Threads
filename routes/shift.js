/* * * This will handle all the requests with regards to employee shifts and work hours * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();
const validateShifts = require('../helpers/shiftHelper').validateShifts;


router.get('/', (req, res, next) => {
    models.getAll(models.Shift, {})
        .then((resolve) => {
            if (resolve.length === 0) {
                res.status(404).send({ success: false, data: 'No entries found for today.' });
            }
            else {
                res.status(200).send({ success: true, data: resolve });
            }
        })
        .catch((reject) => {
            res.status(500).send({ success: false, data: reject});
        });
});

router.post('/add', (req, res) => {

    if (validateShifts(req.body.shifts)) {
        let shiftEntry = models.Shift({
            eid: req.body.eid,
            shifts: req.body.shifts
            // here, req.body.shifts contains an array where each element specifies the day and,
            // the in and out times for that day.
        });

        shiftEntry.save((err) => {
            if (err) {
                res.status(400).send({ success: false, data: err.errmsg });
            }
            else {
                res.status(201).send({ success: true, data: 'Entry inserted' });
            }
        });
    }
    else {
        res.status(400).send({ success: false, data: 'Invalid day or/and time found in shifts.' });
    }
});

router.get('/', (req, res) => {
    models.getAll(models.Shift, {})
        .then((resolve) => {
            if (resolve.length === 0) {
                res.status(404).send({ success: false, data: 'No entries found for today.' });
            }
            else {
                res.status(200).send({ success: true, data: resolve });
            }
        })
        .catch((reject) => {
            res.status(500).send({ success: false, data: reject});
        });
});

module.exports = router;