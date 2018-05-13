/* * * This will provide helper functions for shift router. * * */

let validateShifts = (shifts) => {
    let validity = false;
    if (shifts.length <= 7) {
        // go through shift details of all the 7 days.
        for (let i = 0; i < shifts.length; i++) {
            if (isValidDay(shifts[i].day) && isValid24hTime(shifts[i].time_start) && isValid24hTime(shifts[i].time_end)) {
                validity = true;
            }
            else {
                validity = false;
                break;
            }
        }
    }

    return validity;
}

let isValidDay = (day) => {
    //day = day.toLowerCase();    // for the ease of comparing.
    return (day !== undefined && day !== ''
            && (day === 'monday' || day ==='tuesday' || day ==='wednesday' || day ==='thursday' || day ==='friday' || day ==='saturday' || day ==='sunday'));
}

let isValid24hTime = (time) => {
    if (time.includes(':')) {
        let hours = time.split(':')[0];
        let minutes = time.split(':')[1];

        return (hours <= 23 && minutes <= 59);
    }

    return false;
}

module.exports = { validateShifts, isValidDay, isValid24hTime } ;