// This will handle all the requests with regards to employee.
const models = require('../utils/database');
const express = require('express');
const router = express.Router();

// Get all general information.
router.get('/', (req, res) => {
    models.GeneralInfo.find({}, { _id: 0, __v:0 } , function (err,data) {
        if (err) {
            res.send({ success: false, data: err});

        }
        res.status(200).send({ success: true, data: data});
    });
});


// Add new general information to the database.
router.post('/add', (req,res) =>{
    console.log(req.body);
    let genInfo = models.GeneralInfo({
        hospital_name : req.body.hospital_name,
        date_established: req.body.date_established,
        services: req.body.services
    });

    genInfo.save((err) => {
        if(err){
            res.status(400).send({ success: false, data: 'General information insertion error : ' + err });
        }
        else{
            res.status(200).send({ success: true, data: 'General information added successfully!' });
        }
    });
});


// Add after first insertion / update general infromation.
router.put('/add/service', (req, res) => {

    models.GeneralInfo.findOne({}, (err, data) => {
        if (data) {
            data.services.push(req.body.service);
            data.save();
            res.status(201).send({ success: true, data: 'Service added' });
        }
        else {
            res.status(400).send({ success: false });
        }
    })
});


// Remove a specific service.
router.delete('/remove/:service', (req, res) => {
    models.GeneralInfo.findOne({}, (err, data) => {
        if (data) {
            // get the location of the service to be deleted in the array.
            let index = data.services.indexOf(req.params.service);

            // splice it.
            data.services.splice(index, 1);

            data.save();
            res.status(201).send({ success: true, data: 'Service deleted!' });
        }
        else {
            res.status(400).send({ success: false });
        }
    })

});



module.exports =router;


