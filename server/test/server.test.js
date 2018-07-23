const {
    generarMensaje
} = require('../generarMensaje');
const _ = require('lodash');
const {
    toolsUsuarios
} = require('./../utils/listadoUsuarios');

describe('Usuarios activos', () => {
    var usuarios = new toolsUsuarios();


    beforeEach(() => {
        usuarios.usuarios = [{
            id: '1',
            usuario: 'eduardo',
            room: 'Hola uno'
        }, {
            id: '2',
            usuario: 'pepe',
            room: 'Hola dos'
        }, {
            id: '3',
            usuario: 'helio',
            room: 'Hola uno'
        }]



    });




    it('Agrega un nuevo usuario y retornarlo', () => {

        let eduardo = {
            id: '4',
            usuario: 'afro',
            room: 'perros'
        }
        let nuevoEduardo = new toolsUsuarios();
        nuevoEduardo.agregarUsuario(eduardo.id, eduardo.usuario, eduardo.room);
        expect(nuevoEduardo.usuarios[0]).toEqual(eduardo);
    });



    it('Retornar usuarios del room Hola uno', () => {

        let hola = usuarios.todosUsuario('Hola uno');
        expect(hola).toEqual(['eduardo', 'helio']);
    });

    it('retornar al usuario helio', () => {
        let afro = usuarios.obtenerUsuario('3');
        expect(afro.usuario).toBe('helio');
    });

    it('Eliminar al usuario pepe', () => {

        let eliminado = usuarios.eliminarUsuario('pepe')

        expect(eliminado).toBe(1);
        console.log(usuarios.usuarios);
        
    });
});

let info = {
    de: 'Eduardo',
    mensaje: 'Hola que tal como estas'
}

describe('Generar mensajes', () => {
    it('Generar un mensaje con fecha', () => {
        var mensaje = generarMensaje(info.de, info.mensaje)
        expect(mensaje.de).toBe(info.de);
        expect(_.toNumber(mensaje.hora)).toBeTruthy()
    });
});