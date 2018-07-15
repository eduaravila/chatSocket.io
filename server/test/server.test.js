const {generarMensaje} = require('../generarMensaje');
const _ = require('lodash');

let info = {
    de: 'Eduardo',
    mensaje: 'Hola que tal como estas'
}

describe('Generar mensajes', () => {
    it('Generar un mensaje con fecha', () => {
       var mensaje = generarMensaje(info.de,info.mensaje)
expect(mensaje.de).toBe(info.de);
expect(_.toNumber(mensaje.hora)).toBeTruthy()
    });
});