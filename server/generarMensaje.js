const moment = require('moment')();
let generarMensaje = (de, mensaje) => {
    return {
        de,
        mensaje,
        hora: moment.valueOf()
    }
};

let generarUbicacion = (de, lat, lon) => {
    return {
        de,
        lat,
        lon,
        hora: moment.valueOf(),
        link: `https://www.google.com.mx/maps/?q=${lat},${lon}`
    }

};
module.exports = {
    generarMensaje,
    generarUbicacion
};