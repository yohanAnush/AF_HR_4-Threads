'use strict'

var randomize = require('randomatic');
const models = require('../utils/database');



let isEmpty = (text) =>{
    return text.isEmpty;
}


let isValidName = (text) =>{
    var re = /^[a-zA-Z\s]+$/;
    return re.test(text);
}

let isValidEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
let generateUserName = () => {
    return "user"+randomize('0', 5);
}


module.exports = { isEmpty, isValidName,isValidEmail,generateUserName } ;