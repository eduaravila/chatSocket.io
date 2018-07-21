let _ = require('lodash');
let stringReal = (n)=>{

    return _.isString(n) && n.trim().length > 0;
}
let objeto = {
    nombre: ' njnjfbwejf jb',
    edad: '   veinin nin '
}

let tim = _.map(objeto, _.trim);
console.log(JSON.stringify(tim));
module.exports = {
    stringReal
}