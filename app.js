const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employee');
const attendanceRouter = require('./routes/attendance');
const leavesRouter = require('./routes/leaves');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* All our routes should be placed here. */
app.use('/', indexRouter);
app.use('/employee', employeeRouter);
app.use('/attendance', attendanceRouter);
app.use('/leaves', leavesRouter);

module.exports = app;
