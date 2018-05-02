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

// Attendance model definition.
var AttendanceModel = new Schema ({
    eid: Number,
    time_in: Date,
    time_out: Date
});
// this is what we export(the model after being mapped.
var Attendance = mongoose.model('Attendance', AttendanceModel);

/* * * Insert other models below; follow the above procedure * * */

module.exports = { Attendance };
