'use strict'

const mongoose = require('../utils/database');
const userSchema = mongoose.model('User');
//const bcrypt = require('bcrypt');

const Controller = function () {
    
//     this.addUser = function(data){
//         return new Promise((resolve,reject) =>{
//             bcrypt.genSalt(10,function(err,salt){
//                 bcrypt.hash(data.password, salt, function(err,hash){
//                     let newUser = new userSchema({
//                         name : data.name,
//                         userName: data.userName,
//                         email: data.email,
//                         password: hash

//                     });
//                     newUser.save().then(()=>{
//                         resolve({status:200, message:'User Added'});
//                     }).catch(err =>{
//                         reject({status:500 , message: 'Failed to add user'});
//                     });
//                 });
//             });
//         })
//     }

// this.getuserByuserName = function (data) {
//     return new Promise(resolve,reject)=>{
//         userSchema.findOne({userName: data}).exec().then(data =>{
//             resolve({status : 200, data:data})
//         }).catch(err =>{
//             reject({status: 400, data:'invalid user'})
//         })
//     }
// }







}

module.exports = new Controller();