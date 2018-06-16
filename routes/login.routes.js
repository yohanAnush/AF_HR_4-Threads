'use strict'

const express = require('express');
const router = express.Router();
const Controller = require('./userController');



router.post('/',(req,res)=>{
    Controller.getuserByuserName(req.body.username).then(data =>{
        console.log(data.data.password)
        Controller.comparePassword(req.body.password, data.data.password).then(data =>{
            res.status(data.status).send(data.isMatch);
        }).catch(err=>{
            res.status(err.status).send(err.data);
        })
    }).catch(err=>{
        res.status(err.status).send(err.data);
    })
})


module.exports = router;

