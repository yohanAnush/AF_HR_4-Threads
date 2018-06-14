/* sahiru */
const models = require('../utils/database');
const express = require('express');
const router = express.Router();
var userHelper = require('../helpers/userHelper')



//get all users
router.get('/', (req, res) => {

    models.UserProfile.find({}, { _id: 0, __v: 0 }, (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).send( {success: false, data: 'Unable to retrieve. Error : ' + err });
      }
      else if (data.length === 0) {
        res.status(404).send({ success:false, data: 'User not found.' });
      }
      else{
        res.status(200).send({ success: true, data: data });
      }
    });
  
  });

//get one user
  router.get('/:id', (req, res) => {
    models.UserProfile.find({ eid: req.params.id }, { _id: 0, __v: 0 }, (err, data) => {
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




 // Add New User
router.post('/add', (req, res) => {

  if(!userHelper.isValidName(req.body.name)){
    res.status(200).send({ success: false, data: 'Invalid Name' });
    return;
  }
  if(!userHelper.isValidEmail(req.body.email)){
    res.status(200).send({ success: false, data: 'Invalid email address' });
    return;
  }
  


  var emp = new models.UserProfile({
    
    
    name: req.body.name,
    username: userHelper.generateUserName,
    email: req.body.email,
    password: req.body.email
    
  });

  emp.save((err) => {
    if (err) {
      res.status(500).send({ success: false, data: 'Error occur while adding employee : ' + err });
    }
    res.status(200).send({ success: true, data: 'Successfully added the employee' });

  });
});

