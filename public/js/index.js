var io = io();

io.on('connect', function (socket) {
    console.log('Conectado a el servidor');

io.emit('nuevoMensaje', {
        de: "eduardo",
        para: "servidor"
    })


io.emit('nuevoUsuario',{
mensaje: 'Ingreso un nuevo usuario'
});
  
});

io.on('disconnect', function (socket) {
    console.log('Desconectado del servidor');
})

  io.on('entregarMensaje', (mes) => {
      console.log(mes);
  });
io.on('Bienvenida',(socket)=>{
    console.log(socket);
})
