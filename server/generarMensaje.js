let generarMensaje = (de, mensaje) => {
    return {
        de,
        mensaje,
        hora: new Date().getTime()
    }
};

let generarUbicacion = (de, lat, lon) => {
    return {
        de,
        lat,
        lon,
        hora: new Date().getTime(),
        link: `https://www.google.com.mx/maps/?q=${lat},${lon}`
    }

};
module.exports = {
    generarMensaje,
    generarUbicacion
};