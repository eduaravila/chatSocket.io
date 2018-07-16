const path = require('path'); //rutas entre archivos 
const express= require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {generarMensaje,generarUbicacion}= require('./generarMensaje');
var puerto = process.env.PORT || 3000;




let publicos = path.join(__dirname , '../public');
console.log(publicos);
app.use(express.static(publicos));

io.on('connect', function (socket) {
    console.log('a user connected');


socket.on('crearUbicacion', (mes,callback)=>{
    console.log(mes.lat);
    io.emit('recibirUbicacion', generarUbicacion('Usuario',mes.lat,mes.lon));
    callback();
});

    socket.on('disconnect',() =>{
        console.log('Usuario desconectado.');
       socket.broadcast.emit('usuarioDesconectado',generarMensaje('admin','Usuario desconectado.'));
    })

   

    socket.on('nuevoMensaje', (socket) => {
        console.log(socket);

        io.emit('entregarMensaje',generarMensaje(socket.de,socket.mensaje));
    })


     socket.on('nuevoUsuario', (res) => {
         socket.broadcast.emit('Bienvenida', generarMensaje('Admin', 'Un usuario ingreso al chat.'));
     });

});


http.listen(puerto, () => {
    console.log(`Escuchando desde el puerto ${puerto}`);
});

