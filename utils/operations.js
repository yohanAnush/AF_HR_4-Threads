// returns the date in format: YYYY-mm-dd
// example: 2018-05-02
var getIsoDate = () => {
    let fullDate = new Date().toISOString().substring(0, 19);
    // we substring to remove .725Z from 2018-05-03T04:44:04.725Z.
    // date and time are separated by a T.

    return new Date(fullDate.split('T')[0]);
}

// returns date and time in format: YYYY-mm-dd HH:mm:ss
//example: 2018-05-02 16:00:00
var getIsoDateTime = () => {
    let fullDate = new Date().toISOString().substring(0, 19);
    // we substring to remove .725Z from 2018-05-03T04:44:04.725Z.
    // date and time are separated by a T and we replace it by a space below.

    return new Date(fullDate.replace('T', ' '));
}

module.exports = { getIsoDate, getIsoDateTime };