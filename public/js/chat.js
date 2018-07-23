var io = io();

console.log(_.isNumber(10));
var botonCoor = $('#coordenada');
io.on('connect', function (socket) {
    console.log('Conectado a el servidor');


    io.emit('join', {
        usuario: getCookie('usuario')
        }, function (err) {
        if (err) {
            window.location.href = '/';
        } else {
            console.log('sin errores');
        }
    });


    
    /** TODO:
     * agregar bootstrap
     */
    //obtener coordendas 


    $('button#coordenada').on('click', () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(success, error);
            botonCoor.attr('disabled', true).text('Cargando...');
        } else {
            alert('Geolocalizacion no soportada');
        }
    });
    //enviar un nuevo mensaje
    $('#ingresarM').on('submit', function (e) {
        /**
         * ? entrada sin contenido
         */
        e.preventDefault();

        if ($("input[name='mansaje']").val().length === 0) {
            $("input[name='mansaje']").attr('placeholder', 'INGRESA UN MENSAJE');
            e.preventDefault();

            console.log('nulo');
            return;
        }
        /**
         * ? auto scroll
         */
        io.emit('nuevoMensaje', {
            de: getCookie('usuario'),
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


io.on('actualizarLista',function (info) {
    let list = $('<ol></ol>');
    info.forEach(element => {
list.append($('<li></li>').text(element));
    });

$('.usuarios').html(list).attr('id','listaUsuarios');
});

io.on('entregarMensaje', (mes) => {
generarMostachoAdmin(mes);
});


io.on('recibirUbicacion', (mes) => {
   generarMostachoUbicacion(mes);
})


io.on('Bienvenida', (socket) => {
    generarMostachoAdmin(socket);
})
io.on('usuarioDesconectado', function (socket) {})

$('#mensajes').text('Hola que tal');



/**
 * ! metodo inseguro para agregar mensajes utilizar en caso de que templates no esten disponobles
 */
// function agregaLista(mensaje) {
//     let hora = moment(mensaje.hora).format('h:mm a');
//     console.log(hora);
//     let horaItem = $('<i></i>').text(hora);
//     horaItem.addClass('badge');
//     console.log(horaItem);
//     let item = $(`<li>${mensaje.de}: ${mensaje.mensaje}</li>`);

//     $('#mensajes').append(item).append(horaItem);
// }

// function agregarUbicacion (mes) {
//   let item = $(`<li>Mi ubicaion </li>`);
//   let link = $(`<a target=_blank>actual</a>`);
//   $(link).attr('href',mes.link);
//   $(item).append(link);
//       $('#mensajes').append(item);

// };

function success(posision) {
    io.emit('crearUbicacion', {
        lat: posision.coords.latitude,
        lon: posision.coords.longitude,
        usuario: getCookie('usuario')

    }, function () {
        botonCoor.attr('disabled', false).text('Obtener ubicacion');
    });
}

function error(params) {
    alert('No se puede obtener tu localizacion sin tu permiso');
}

function autoScroll(params) {
    let todoChat = $('#zonaChat').prop('scrollHeight');
    let clienteScroll = $('#zonaChat').prop('clientHeight');
    let topScroll = $('#zonaChat').prop('scrollTop');
    let nuevoItem = $('#mensajes').children('li:last-child')
    let nuevoScroll = nuevoItem.prop('offsetHeight');
    let ultimoItem = nuevoItem.prev().prop('offsetHeight');
    console.log(todoChat, clienteScroll, nuevoScroll, ultimoItem, topScroll);

    if (clienteScroll + topScroll + nuevoScroll + ultimoItem >= todoChat) {
        $('#zonaChat').scrollTop(todoChat);
    }
}
/**
 * *obtener una cookie
 */
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function generarMostachoAdmin(mes) {
    let hora = moment(mes.hora).format('h:mm a');
    let template = $('#template-mensaje').html();
    let templeteRende = Mustache.render(template, {
        titulo: mes.de,
        texto: mes.mensaje,
        hora
    });
    $('#mensajes').append(templeteRende);
    autoScroll();

}

function generarMostachoUbicacion(mes) {
    /**
     * * template para la ubicacion
     */
    let template = $('#template-ubicacion').html();
    let templeteRende = Mustache.render(template, {
        titulo: mes.de,
        link: mes.link

    });
    $('#mensajes').append(templeteRende);
    autoScroll()
}