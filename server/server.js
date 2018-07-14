const path = require('path'); //rutas entre archivos 
const express= require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {generarMensaje}= require('./generarMensaje');
var puerto = process.env.PORT || 3000;




let publicos = path.join(__dirname , '../public');
console.log(publicos);
app.use(express.static(publicos));

io.on('connect', function (socket) {
    console.log('a user connected');

    socket.on('disconnect',() =>{
        console.log('usuario desconectado');
    })

    socket.on('nuevoUsuario',(res)=>{
     socket.broadcast.emit('Bienvenida',generarMensaje('Eduardo','Bienvenido a el servicio de chat'));
    });

    socket.on('nuevoMensaje', (socket) => {
        console.log(socket);

        io.emit('entregarMensaje',generarMensaje(socket.de,socket.para));
    })
});


http.listen(puerto, () => {
    console.log(`Escuchando desde el puerto ${puerto}`);
});

