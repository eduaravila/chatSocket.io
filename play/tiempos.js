const moment = require('moment');


let tiempo = moment().format('h:mm A');
console.log(tiempo);
console.log(moment().valueOf());
console.log(moment().unix());
console.log(new Date().getTime());