


class toolsUsuarios {

    constructor (){

    this.usuarios = [];
        
    }

    agregarUsuario (id,usuario,room){
        let nuevo = {
            id,
            usuario,
            room
        }
        this.usuarios.push(nuevo);
        return nuevo;
    }

    todosUsuario (room){

        let nombresFltrados = this.usuarios.map((e,i)=> { if(e.room === room) return e.usuario})
        return nombresFltrados;
    }

    obtenerUsuario(id){
        let use = this.usuarios.find((e)=> e.id ==id)
        return use;

    }
    eliminarUsuario(id){
        let room = this.obtenerUsuario(id);
        let eliminado = this.usuarios.findIndex(e=> e.usuario == id);
       this.usuarios.splice(eliminado,1); // elimina a el usuari
        return room;
    }
}



module.exports = {toolsUsuarios}; 