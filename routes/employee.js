/* * * This will handle all the requests with regards to employee * * */

const express = require('express');
const router = express.Router();

var emp = [];

/* GET Employee Details. */
router.get('/', (req, res) => {
  // var emp = [{ "eid": 108, "email": "amal@gmail.com", "name": "Dr. A.D. Perera", "gender": "Male", "position": "Doctor", "department": "OPD", "date_joined": "2018-01-01" },
  // { "eid": 110, "email": "kamal@gmail.com", "name": "Dr. K.S. Perera", "gender": "Male", "position": "Doctor", "department": "OPD", "date_joined": "2017-08-01" }];
  res.status(200).send(JSON.stringify(emp));
});

router.post('/add', (req, res) => {
  var mEmp = new Employee(Date.now(), req.body.name, req.body.position);
  emp.push(mEmp);
  res.status(200).send({ message: 'Successfully added the user' });
});

router.put('/update/:id', (req, res) => {
  var id = req.params.id;
  var empObj = emp.find((element) => {
    return element.id == id;
  });

  empObj.name = req.body.name;
  empObj.position = req.body.position;

  res.status(200).send(empObj);
});

router.delete('/remove/:id', (req, res) => {
  var id = req.params.id;
  var index = emp.findIndex(x => x.Id == id);
  emp.splice(index, 1);
  res.status(200).send({ message: "Successfully Deleted", my_data: emp });
});

var Employee = function (id, name, position) {
  this.id = id;
  this.name = name;
  this.position = position;
}


module.exports = router;
