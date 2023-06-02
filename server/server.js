const path = require('path'); //rutas entre archivos 
const express = require('express');
const config = require('./configuracion/config')
const app = express();
const cookie_parser = require('cookie-parser'); //? convierte cookies en objetos
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('lodash');
const {
    toolsUsuarios
} = require('./utils/listadoUsuarios');
const {
    usuario
} = require('./db/models/usuarios');
const {
    generarMensaje,
    generarUbicacion
} = require('./generarMensaje');
const jwt = require('jsonwebtoken');

var puerto = process.env.PORT || 3000;
var header;
const {
    stringReal
} = require('./utils/stringReal');
//** */
const {
    usuarioConectado
} = require('./utils/conectar');
const {
    generarToken,
    desifraToken
} = require('./utils/webTokens'); //! genera web token para as cookies encriptadas
let publicos = path.join(__dirname, '../public');
let listaUsuarios = new toolsUsuarios();

app.use(express.static(publicos));
app.use(cookie_parser());
/**
 * TODO: AGREGAR LA COMPROBACION DE INICIO DE SESION EN EL INDEX ES DECIR SABER I YA INICIO SESION Y TRATA DE VOLVER A LOGIN LO REDIGUE DE NUEVO A LA SALA DE CHAT HASTA QUE EL USUARIO TERMINE LA SESION
 * ! REPARAR DEPENDENCIAS 
 */




app.get('/ingresar', async (req, res, next) => {

    var objeto = _.pick(req.query, ['usuario', 'room']); //? solo toma los valores que estan en el formulario no mas
    if (stringReal(objeto.usuario) && stringReal(objeto.room)) {
        try {            
            res.cookie('usuario', generarToken(objeto.usuario, "", true, objeto.room), {
                maxAge: 900000
            });

            res.redirect('/chat.html');
        } catch (e) {
            res.redirect('/');
        }

    } else {
        res.redirect('/');
    }
});


io.on('connect', (socket)=> {

    console.log(socket.id);
    socket.on('join',async (datos, callback) => {

        try {
            let token = await desifraToken(datos.usuario);

            if (!token.ingreso) {
                callback('sesion caduca');
            } else {

                socket.join(token.sala);
                listaUsuarios.agregarUsuario(socket.id, token.usuario, token.sala);

                io.to(token.sala).emit('actualizarLista', listaUsuarios.todosUsuario(token.sala));
                console.log(listaUsuarios.todosUsuario(token.sala));
                socket.broadcast.to(token.sala).emit('Bienvenida', generarMensaje('Admin', `${token.usuario} ingreso a la sala.`)); //? envia el mensaje a todos los usuarios menos a el usuario que ingreso a la sala

            }
        } catch (e) {
            callback('no se inicio sesion');
        }


    })


    socket.on('crearUbicacion', async (mes, callback) => {
        try {
            let result = desifraToken(mes.usuario)
            io.to(result.sala).emit('recibirUbicacion', generarUbicacion(result.usuario, mes.lat, mes.lon));
            callback();
        } catch (e) {

        }

    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado.');
        var eliminado = listaUsuarios.eliminarUsuario(socket.id);
        console.log('eliminado', eliminado);
        if (eliminado) {
            io.to(eliminado.room).emit('actualizarLista', listaUsuarios.todosUsuario(eliminado.room));
            io.to(eliminado.room).emit('entregarMensaje', generarMensaje('admin', `${eliminado.usuario} abandono la sala.`));
        }


    })



    socket.on('nuevoMensaje', async (socket) => {
        console.log(socket);
        try {
            let result = await desifraToken(socket.de)

            io.to(result.sala).emit('entregarMensaje', generarMensaje(result.usuario, socket.mensaje));

        } catch (e) {
            io.emit('entregarMensaje', generarMensaje('desconocido', socket.mensaje));

        }

    })


});
app.get('/lista', (req, res) => {
    res.send(listaUsuarios.usuariosRoom());
});

http.listen(puerto, () => {
    console.log(`Escuchando desde el puerto ${puerto}`);
});