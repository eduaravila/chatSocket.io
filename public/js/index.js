var io = io();
io.on('connect', function (socket) {
    console.log('Conectado a el servidor');

    /** TODO:
     * agregar bootstrap
     */
    //obtener coordendas 


    $('button#coordenada').on('click', () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(success, error);

        } else {
            alert('Geolocalizacion no soportada');
        }
    });
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
    io.emit('nuevoUsuario', {
        mensaje: 'Ingreso un nuevo usuario'
    });

});

io.on('disconnect', function (socket) {
    console.log('Desconectado del servidor');
})




io.on('entregarMensaje', (mes) => {
    agregaLista(mes);
});

io.on('recibirUbicacion', (res) => {
    agregarUbicacion(res);
})


io.on('Bienvenida', (socket) => {
    agregaLista(socket);
})
io.on('usuarioDesconectado', function (socket) {
})

$('#mensajes').text('Hola que tal');




function agregaLista(mensaje) {
    let item = $(`<li>${mensaje.de}: ${mensaje.mensaje}</li>`);
    $('#mensajes').append(item);
}
function agregarUbicacion (mes) {
  let item = $(`<li>Mi ubicaion </li>`);
  let link = $(`<a target=_blank>actual</a>`);
  $(link).attr('href',mes.link);
  $(item).append(link);
      $('#mensajes').append(item);

};

function success(posision) {
    io.emit('crearUbicacion', {
        lat: posision.coords.latitude,
        lon: posision.coords.longitude
    });
}

function error(params) {
    alert('No se puede obtener tu localizacion sin tu permiso');
}