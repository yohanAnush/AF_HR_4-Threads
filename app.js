var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var employeeRouter = require('./routes/employee');
var attendanceRouter = require('./routes/attendance');
var leavesRouter = require('./routes/leaves');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* All our routes should be placed here. */
app.use('/', indexRouter);
app.use('/employee', employeeRouter);
app.use('/attendance', attendanceRouter);
app.use('/leaves', leavesRouter);

module.exports = app;
