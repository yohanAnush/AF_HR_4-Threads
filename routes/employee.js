/* * * This will handle all the requests with regards to employee * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();


/* GET Employee Details. */
router.get('/', (req, res) => {

  models.Employee.find({}, function (err, data) {
    if (err) {
      console.log(err);
      process.exit(-1);
    }
    res.status(200).send(data);
  });

});


/*GET single employee details using _id */
router.get('/:id', (req, res) => {
  models.Employee.find({ _id: req.params.id }, function (err, data) {
    if (err) {
      console.log(err);
      process.exit(-1);
    }
    res.status(200).send(data);
  });
});


/*Add New Employee to database. Here we use POST method*/
router.post('/add', (req, res) => {

  var emp = new models.Employee({
    eid: Date.now(),
    email: req.body.name + '@gmail.com',
    password: req.body.name,
    name: req.body.name,
    gender: 'Male',
    position: req.body.position,
    department: 'OPD',
    date_joined: new Date(Date.now()),
  });

  emp.save().then(() => {
    res.status(200).send({ message: 'Successfully added the employee' });
  });

});


/**
 * Update Employee details using _id
 * PUT method is used to update details
 */
router.put('/update/:id', (req, res) => {

  models.Employee.update({ _id: req.params.id }, req.body).then(() => {
    res.status(200).send({ message: 'Successfully Updated' });
  }).catch(err => {
    res.status(404).send({ message: 'Invalid Id Provided', error: err });
  });

});

/*Remove Employee, Request parameter is _id */
router.delete('/remove/:id', (req, res) => {

  models.Employee.remove({ _id: req.params.id }).then(() => {
    res.status(200).send({ message: 'Successfully Deleted' });
  }).catch(err => {
    res.status(404).send({ message: 'Invalid Id Provided', error: err });
  });

});


module.exports = router;
