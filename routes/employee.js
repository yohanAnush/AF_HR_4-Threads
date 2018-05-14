/* * * This will handle all the requests with regards to employee * * */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();


/* GET Employee Details. */
router.get('/', (req, res) => {

  models.Employee.find({}, { _id: 0, __v: 0 }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(404).send( {success: false, data: 'Unable to retrieve. Error : ' + err });
    }
    res.status(200).send({ success: true, data: data });
  });

});


/*GET single employee details using _id */
router.get('/:id', (req, res) => {
  models.Employee.find({ eid: req.params.id }, { _id: 0, __v: 0 }, (err, data) => {
    if (err) {
      res.status(500).send({ success: false, data: 'Internal error : ' + err });
    }
    else if (data.length === 0) {
      res.status(404).send({ success:false, data: 'Invalid id provided.' });
    }
    else {
      res.status(200).send({ success: true, data: data });
    }
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

  emp.save((err) => {
    if (err) {
      res.status(400).send({ success: false, data: 'Error occur while adding employee : ' + err });
    }
    res.status(200).send({ success: true, data: 'Successfully added the employee' });

  });
});


/**
 * Update Employee details using _id
 * PUT method is used to update details
 */
router.put('/update/:id', (req, res) => {
  findEmployee(req.params.id).then((data) => {
    models.Employee.update({ eid: req.params.id }, req.body, (err) => {
      if (err) {
        res.status(500).send({ success: false, data: 'Internal error : ' + err });
      }
      res.status(200).send({ success: true, data: 'Successfully Updated' });
    });
  }).catch((err) => {
    res.status(404).send({ success: false, data: 'Invalid Id Provided ' });
  });
});

/*Remove Employee, Request parameter is _id */
router.delete('/remove/:id', (req, res) => {

  findEmployee(req.params.id).then((data) => {
    models.Employee.remove({ eid: req.params.id }, (err) => {
      if (err) {
        res.status(500).send({ success: false, data: 'Internal error : ' + err });
      }
      res.status(200).send({ success: true, data: 'Successfully Deleted' });
    });
  }).catch((err) => {
    res.status(404).send({ success: false, data: 'Invalid Id Provided ' });
  });


});

function findEmployee(id) {
  return new Promise((resolve, reject) => {
    models.Employee.find({ eid: id }, { _id: 0, __: 0 }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length === 0) {
          reject('invalid id');
        } else {
          resolve(result);
        }
      }
    });
  });
}


module.exports = router;
