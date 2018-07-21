let _ = require('lodash');
let {mongoose} = require('./../db/conexion');

let usuarioConectado = (req,res,next)=>{
    console.log(req.cookies);
    next();
}

module.exports = {usuarioConectado}