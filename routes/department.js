// This will handle all the requests with regards to employee.
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

// Get all department details.
router.get('/', (req, res) => {
    models.Department.find({}, { _id: 0, __v:0 } , function (err,data) {
        if (err) {
            res.send({ success: false, data: err});

        }
        res.status(200).send({ success: true, data: data});
    });
});


// Get a given department's details.
router.get('/:did', (req, res) => {
    models.Department.find({did: req.params.did}, {_id: 0, __v:0}, function (err, data) {
        if (err) {
            res.send({ success: false, data: err});
        }
        res.status(200).send({ success: true, data: data});
    });
});

router.get('/name/:name', (req, res) => {
    models.Department.find({name: req.params.name}, {_id: 0, __v:0}, function (err, data) {
        if (err) {
            res.send({ success: false, data: err});
        }
        res.status(200).send({ success: true, data: data});
    });
});



// Add a new department to the database.
router.post('/add', (req,res) =>{
    console.log(req.body);
    let dept = models.Department({
        did: Date.now(),
        name: req.body.name,
        description: req.body.description,
        department_manager: req.body.department_manager,
        date_established: new Date(req.body.date_established)
    });
    dept.save((err) => {
        if(err){
            res.status(400).send({ success: false, data: 'Department insertion error : ' + err });
        }
        else{
            res.status(200).send({ success: true, data: 'Department inserted successfully!' });
        }
    });
});


// Update details of a given department.
router.put('/update/:did', (req, res) => {

    models.Department.update({ did: req.params.did}, req.body).then(() => {
        res.status(200).send({ success: true, data: 'Successfully Updated!' });
    }).catch(err => {
        res.status(404).send({ success: false, data: 'Given department id doesn\'t exist!\n' + err });
    });
});


// Remove a specific department's details.
router.delete('/remove/:did', (req, res) => {

    models.Department.remove({ did: req.params.did }).then(() => {
        res.status(200).send({ success: true, data: 'Successfully Deleted!' });
    }).catch(err => {
        res.status(404).send({ success: false, data: 'Given department id doesn\'t exist!\n' + err });
    });
});



module.exports =router;


