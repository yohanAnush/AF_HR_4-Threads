/* * * This will handle all the requests with regards to employee attendance * * */

var express = require('express');
var router = express.Router();

/* GET employees on leave for today */
router.get('/', (req, res) => {
   res.status(200).send(JSON.stringify([{"eid":"432", "date_start":"2018-04-30", "date_end":"2018-05-02"},
                                       {"eid":"434", "date_start":"2018-04-30", "date_end":"2018-05-03"},
                                       {"eid":"452", "date_start":"2018-04-30", "date_end":"2018-05-01"}]));
});

module.exports = router;