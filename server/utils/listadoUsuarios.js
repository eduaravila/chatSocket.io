const _ = require('lodash');
class toolsUsuarios {

    constructor() {

        this.usuarios = [];
        this.room = [];
    }

    agregarUsuario(id, usuario, room) {
        let nuevo = {
            id,
            usuario,
            room
        }
        this.usuarios.push(nuevo);
        return nuevo;
    }

    todosUsuario(room) {

        let nombresFltrados = this.usuarios.map((e, i) => {
            if (e.room === room) return e.usuario
        })
        return nombresFltrados;
    }
    usuariosRoom() { //* obtener todos los usuarios y sus rooms 
        let cuenta = {};
        this.usuarios.map((e, i) => {
            cuenta[e.room] = cuenta[e.room] ? cuenta[e.room] + 1 : 1;

        });
        return cuenta


    }
    obtenerUsuario(id) {
        let use = this.usuarios.find((e) => e.id == id)
        return use;

    }
    eliminarUsuario(id) {
        let room = this.obtenerUsuario(id);
        let eliminado = this.usuarios.findIndex(e => e.usuario == id);
        this.usuarios.splice(eliminado, 1); // elimina a el usuari
        return room;
    }

    agregarSala(nombre) {
        this.room.push(nombre);
        return this.room;
    }
    NoExistente(nombre) {

        return _.isUndefined(this.room.find((e) => e === nombre));
    }
    eliminarSala(nombre) {
        let indice = this.room.findIndex(e => e === nombre)
        this.room.splice(indice, 1);
        return indice;
    }
    eliminarBasia(obj) {
        _.forIn(obj, (val, key) => {
            if(val >1 ){
                this.eliminarSala(key)
            }
        })

    }
}





module.exports = {
    toolsUsuarios
};