const path = require('path'); //rutas entre archivos 
const express = require('express');
const app = express();
const cookie_parser = require('cookie-parser'); //? convierte cookies en objetos
const http = require('http').Server(app);
const io = require('socket.io')(http);
const _ = require('lodash');
const {
    mongoose9
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
console.log(publicos);
app.use(express.static(publicos));
app.use(cookie_parser());

// app.use((req,res,next)=>{
// console.log('cookies',req.cookies);
// if(req.cookies.ingreso){
//     console.log('ingreso');
// }
// else{
//     console.log('iniciar sesion');
// }
// next();
// })
app.get('/ingresar', (req, res, next) => {

    var objeto = _.pick(req.query, ['usuario', 'contrasenia']); //? solo toma los valores que estan en el formulario no mas
    if (stringReal(objeto.usuario) && stringReal(objeto.contrasenia)) {



        usuario.comprobar(objeto.usuario, objeto.contrasenia)
            .then((result) => {
                res.cookie('usuario', generarToken(result.usuario, objeto.contrasenia, true), {
                    maxAge: 900000
                });
                res.setHeader('usuarioDos', result.usuario);
                res.header('usuarioUno', result.usuario);
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


    socket.on('join', (datos, callback) => {
        desifraToken(datos.usuario).then(token => {
                if (!token.ingreso) {
                    callback('sesion caduca');
                } else {
                    console.log('correcto');
                }
            })
            .catch(err => {
                callback('no se inicio sesion')
            })

    })


    socket.on('crearUbicacion', (mes, callback) => {
        console.log(mes.lat);
        callback();
        io.emit('recibirUbicacion', generarUbicacion('Usuario', mes.lat, mes.lon));
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado.');
        socket.broadcast.emit('usuarioDesconectado', generarMensaje('admin', 'Usuario desconectado.'));
    })



    socket.on('nuevoMensaje', (socket) => {
        console.log(socket);

        io.emit('entregarMensaje', generarMensaje(socket.de, socket.mensaje));
    })


    socket.on('nuevoUsuario', (res) => {
        socket.broadcast.emit('Bienvenida', generarMensaje('Admin', 'Un usuario ingreso al chat.'));
    });

});


http.listen(puerto, () => {
    console.log(`Escuchando desde el puerto ${puerto}`);
});