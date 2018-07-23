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
    mongoose
} = require('./db/conexion');
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

console.log(publicos);
app.use(express.static(publicos));
app.use(cookie_parser());
/**
 * TODO: AGREGAR LA COMPROBACION DE INICIO DE SESION EN EL INDEX ES DECIR SABER I YA INICIO SESION Y TRATA DE VOLVER A LOGIN LO REDIGUE DE NUEVO A LA SALA DE CHAT HASTA QUE EL USUARIO TERMINE LA SESION
 * ! REPARAR DEPENDENCIAS 
 */




app.get('/ingresar', (req, res, next) => {

    var objeto = _.pick(req.query, ['usuario', 'contrasenia', 'room']); //? solo toma los valores que estan en el formulario no mas
    if (stringReal(objeto.usuario) && stringReal(objeto.contrasenia) && stringReal(objeto.room)) {



        usuario.comprobar(objeto.usuario, objeto.contrasenia)
            .then((result) => {
                res.cookie('usuario', generarToken(result.usuario, objeto.contrasenia, true, objeto.room), {
                    maxAge: 900000
                });

                res.redirect('/chat.html');

            }).catch((err) => {
                console.log(err);
                res.redirect('/');
            });
    } else {
        res.redirect('/');
    }
});


io.on('connect', function (socket) {

    console.log(socket.id);
    socket.on('join', (datos, callback) => {

        desifraToken(datos.usuario).then(token => {
                if (!token.ingreso) {
                    callback('sesion caduca');
                } else {

                    socket.join(token.sala);
                    listaUsuarios.agregarUsuario(socket.id, token.usuario, token.sala);

                    io.to(token.sala).emit('actualizarLista', listaUsuarios.todosUsuario(token.sala));
                    console.log(listaUsuarios.todosUsuario(token.sala));
                    socket.broadcast.to(token.sala).emit('Bienvenida', generarMensaje('Admin', `${token.usuario} ingreso a la sala.`)); //? envia el mensaje a todos los usuarios menos a el usuario que ingreso a la sala

                }
            })
            .catch(err => {
                callback('no se inicio sesion')
            })

    })


    socket.on('crearUbicacion', (mes, callback) => {
        desifraToken(mes.usuario)
        .then((result) => {
        console.log(mes.lat);
        io.to(result.sala).emit('recibirUbicacion', generarUbicacion(result.usuario, mes.lat, mes.lon));    
        callback();
        }).catch((err) => {
            
        });
        
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado.');
        var eliminado = listaUsuarios.eliminarUsuario(socket.id);
        console.log('eliminado',eliminado);
        if (eliminado) {
            io.to(eliminado.room).emit('actualizarLista', listaUsuarios.todosUsuario(eliminado.room));
            io.to(eliminado.room).emit('entregarMensaje', generarMensaje('admin', `${eliminado.usuario} abandono la sala.`));
        }


    })



    socket.on('nuevoMensaje', (socket) => {
        console.log(socket);

        desifraToken(socket.de)
            .then((result) => {
                io.to(result.sala).emit('entregarMensaje', generarMensaje(result.usuario, socket.mensaje));
            }).catch((err) => {
                io.emit('entregarMensaje', generarMensaje('desconocido', socket.mensaje));

            });

    })


    socket.on('nuevoUsuario', (res) => {

    });

});


http.listen(puerto, () => {
    console.log(`Escuchando desde el puerto ${puerto}`);
});