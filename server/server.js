const path = require('path'); //rutas entre archivos 
const express= require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
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
     socket.broadcast.emit('Bienvenida',{
         res
     });
    });

    socket.on('nuevoMensaje', (socket) => {
        console.log(socket);

        io.emit('entregarMensaje',{
            hora:new Date().getTime().toString(),
            de: socket.de,
            para: socket.para
        })
    })
});


http.listen(puerto, () => {
    console.log(`Escuchando desde el puerto ${puerto}`);
});

