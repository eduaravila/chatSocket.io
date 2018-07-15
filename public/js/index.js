var io = io();
io.on('connect', function (socket) {
    console.log('Conectado a el servidor');


//enviar un nuevo mensaje
$('#ingresarM').on('submit', function (e) {
    e.preventDefault();

io.emit('nuevoMensaje', {
        de: "Usuario",
        mensaje: $(e.target[0]).val()
    });
    this.reset();
});

//ingreso un nuevo usuario
io.emit('nuevoUsuario',{
mensaje: 'Ingreso un nuevo usuario'
});
  
});

io.on('disconnect', function (socket) {
    console.log('Desconectado del servidor');
})




  io.on('entregarMensaje', (mes) => {
      agregaLista(mes);
  });


io.on('Bienvenida',(socket)=>{
agregaLista(socket);
})
io.on('usuarioDesconectado',function (socket) {
console.log(socket);
})

$('#mensajes').text('Hola que tal');




function agregaLista(mensaje) {
    let item = $(`<li>${mensaje.de}:${mensaje.mensaje}</li>`);
    $('#mensajes').append(item);
}