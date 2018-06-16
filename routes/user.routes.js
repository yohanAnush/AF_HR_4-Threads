'use strict'

const express = require('express');
const router = express.Router();
const Controller = require('./userController');

router.post('/',function(req,res){
    let name = req.body.name;
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let password2 = req.body.confpassword;

    if(password==password2){
        console.log('match');
    }

    req.checkBody('name','name required').notEmpty();
    req.checkBody('username','username required').notEmpty();
    req.checkBody('email','emil required').notEmpty();
    req.checkBody('email','not valid email').isEmail();
    req.checkBody('password','password required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.status(400).send({error:errors});
    }
    else{
        Controller.addUser({
            name: name,
            userName: username,
            email: email,
            password: password
        }).then(data =>{
            res.status(data.status).send(data.message);
        }).catch(err => {
            res.status(err.status).send(err.message);
        });

    }

});

module.exports = router;