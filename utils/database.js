/*
 * This will handle the basic connection and model definitions
 * with mongodb via mongoose.
 *
 * Import by doing: const models = require('../utils/database');
 * Use your model by doing: models.YourModel
 */

const mongoose = require('mongoose');
const mongoDb = 'mongodb://127.0.0.1:27017/HR'; // HR is the database.

/* * Connection establishing * */
mongoose.connect(mongoDb);
mongoose.Promise = global.Promise;
// this is what we should manipulate.
var db = mongoose.connection;
// for defining schema. Use Schema(..) as a constructor.
var Schema = mongoose.Schema;
// for errors.
db.on('error', (error) => {
    console.log(error);
});


/* Models definitions *
 * Be sure to add the mapping of the Model to the export at the end
 */

// Employee model definition.
const EmployeeModel = new Schema({
    eid: String,
    email: String,
    password: String,
    name: String,
    gender: String,
    position: String,
    department: String,
    date_joined: Date
});

let Employee = mongoose.model('Employee', EmployeeModel);

// Attendance model definition.
const AttendanceModel = new Schema({
    eid: String,
    date: Date,
    time_in: String,
    time_out: String

});
// this is what we export(the model after being mapped.
let Attendance = mongoose.model('Attendance', AttendanceModel);

/* * * Insert other models below; follow the above procedure * * */
// Leave model definition.
const LeaveModel = new Schema({
    eid: Number,
    date_start: Date,
    date_end: Date
});
let Leave = mongoose.model('Leave', LeaveModel);

// Department model definition.
const DepartmentModel = new Schema({
    did : String,
    name : String,
    date_established : Date
});

let Department = mongoose.model('Department', DepartmentModel);

// General Information model definition.
const GeneralInfoModel = new Schema({
    hospital_name: String,
    date_established: String,
    services: String
});

let GeneralInfo = mongoose.model('GeneralInfo', GeneralInfoModel);



// Exporting the mapped models.
module.exports = { Attendance, Leave , Employee, Department, GeneralInfo };
