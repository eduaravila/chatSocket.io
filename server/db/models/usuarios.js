const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

/**
 * *declaro un modelo para iniciar sesion en el chat
 */
var usuariosSquema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true,
        trim: true
        
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    }
})

// ? executa esta funcion antes de guardar genera un password encriptado
usuariosSquema.pre('save', function (next) { // * funcion asincrona por eso se incluye el next 

    if (this.isModified('password')) {
        bcrypt.genSalt(5, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                console.log('has');
                this.password = hash
                next();
            });
        });
    } else {
        next();
    }

});


usuariosSquema.statics.comprobar = function (usuario, password) {

    return this.findOne({
            usuario
        })
        .then((result) => {
            console.log(result);
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, result.password, (err, res) => {
                    if (res) {
                        resolve(result)
                    } else {
                        reject('Contraseña invalida');
                    }
                })
            })
        })
        .catch(e => {
            return Promise.reject(e);
        })
}


let usuario = mongoose.model('usuario', usuariosSquema);
module.exports = {
    usuario
}