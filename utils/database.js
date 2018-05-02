/* This will handle the basic connection and things involved
 * with mongodb via mongoose.
 *
 * While this provides a connection, please create your own schema on
 * respective js files.
 */
const mongoose = require('mongoose');
const mongoDb = 'mongodb://127.0.0.1:27017/HR'; // HR is the database.

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


var AttendanceModel = new Schema ({
    eid: Number,
    time_in: Date,
    time_out: Date
});

var Attendance = mongoose.model('Attendance', AttendanceModel);

module.exports = { Attendance };
