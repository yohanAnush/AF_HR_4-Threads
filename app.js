const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const grant = require('grant-express');
const session = require('express-session');

const indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employee');
const attendanceRouter = require('./routes/attendance');
const leavesRouter = require('./routes/leaves');
const shiftRouter = require('./routes/shift');
const departmentRouter = require('./routes/department');
const generalInformationRouter = require('./routes/general');
const UserProfileRouter = require('./routes/login');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

/* All our routes should be placed here. */
app.use('/', indexRouter);
app.use('/employee', employeeRouter);
app.use('/attendance', attendanceRouter);
app.use('/leaves', leavesRouter);
app.use('/shift', shiftRouter);
app.use('/department', departmentRouter);
app.use('/general', generalInformationRouter);
app.use('/users',UserProfileRouter);

module.exports = app;
