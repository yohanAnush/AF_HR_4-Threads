// This will handle all the requests with regards to employee.
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

// Get all department details.
router.get('/', (req, res) => {
    models.Department.find({}, { _id: 0, __v:0 } , function (err,data) {
        if (err) {
            console.log("Department details retrieval failed!");
            process.exit(-1);
        }
        res.status(200).send(data);
    });
});


// Get a given department's details.
router.get('/:did', (req, res) => {
    models.Department.find({did: req.params.did}, {_id: 0, __v:0}, function (err, data) {
        if (err) {
            console.log("Given department id doesn't exist!");
            process.exit(-1);
        }
        res.status(200).send(data);
    });
});


// Add a new department to the database.
router.post('/add', (req,res) =>{
    console.log(req.body);
    let dept = models.Department({
        did: Date.now(),
        name: req.body.name,
        date_established: req.body.date_established
    });
    dept.save((err) => {
        if(err){
            res.status(400).send("Department insertion error : " + err);
        }
        else{
            res.status(200).send("Department inserted successfully!");
        }
    });
});


// Update details of a given department.
router.put('/update/:did', (req, res) => {

    models.Department.update({ did: req.params.did}, req.body).then(() => {
        res.status(200).send({ message: "Successfully Updated!" });
    }).catch(err => {
        res.status(404).send({ message: "Given department id doesn't exist!", error: err });
    });
});


// Remove a specific department's details.
router.delete('/remove/:did', (req, res) => {

    models.Department.remove({ did: req.params.did }).then(() => {
        res.status(200).send({ message: "Successfully Deleted!" });
    }).catch(err => {
        res.status(404).send({ message: "Given department id doesn't exist!", error: err });
    });
});



module.exports =router;


