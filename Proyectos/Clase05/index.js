const moment = require('moment');

const actual = moment()
console.log(actual)

const birthday = moment('2004-12-30', 'YYYY-MM-DD');

if (actual.isValid()) {
    console.log(` # dias = ${actual.diff(birthday, 'days')} dias`);
}
