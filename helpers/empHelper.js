/* * * This will provide helper functions for employee router. * * */
var randomize = require('randomatic');
const models = require('../utils/database');

let generateEmployeeId = () => {
    return "EMP"+randomize('0', 5);
}

let isValidEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

let isValidGender = (gender) => {
    return (gender !== undefined && gender !== '' && (gender === 'Male' || gender ==='Female'));
}

let isEmpty = (text) =>{
    return text.isEmpty;
}

let isValidName = (text) =>{
    var re = /^[a-zA-Z\s]+$/;
    return re.test(text);
}

function checkId(eid){
    models.Employee.find({ eid: eid }, { _id: 0, __: 0 }, (err, result) => {
        if (err) {
            console.log('internal error call again');
            checkId("EMP"+randomize('0', 5));
        } else {
          if (result.length === 0) {
            console.log('length 0'+eid);
            return eid;
          } else {
            console.log('call again');
            checkId("EMP"+randomize('0', 5));
          }
        }
      });
}

module.exports = { isValidEmail, isValidGender, isEmpty, isValidName, generateEmployeeId } ;