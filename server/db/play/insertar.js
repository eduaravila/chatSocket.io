let {
    usuario
} = require('../models/usuarios'); //? crea la tabla de usuarios en la base de datos
let {
    mongoose
} = require('../conexion'); // ? ingresa en la base de datos
let bcrypt = require('bcryptjs');

let eduardo = new usuario({
    usuario: 'eduardo',
    password: '12345678'
})
let pepe = new usuario({
    usuario: 'pepe',
    password:'12345678'
});
let helio = new usuario({
    usuario: 'helio',
    password: '12345678'
})

pepe.save()
helio.save();
eduardo.save()
    .then((result) => {
        console.log(result);

        usuario.find({
                usuario: 'eduardo'
            })
            .then((resu) => {
                console.log('ola');
                console.log(result);

                return bcrypt.compare('123456789', resu.password, (err, res) => {
                    if (res) {
                        return;
                    } else {
                        console.log('exito');
                    }
                })

            }).catch((err) => {

            });
    }).catch((err) => {
        console.log(err);
    });