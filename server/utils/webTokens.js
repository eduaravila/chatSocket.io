let jwt = require('jsonwebtoken');



let generarToken = (usuario,pass,ingreso,sala)=>{
 return jwt.sign({usuario,pass,ingreso,sala},'secreto')

}
let desifraToken = (token)=>{
    try{
    var info = jwt.verify(token,'secreto');
    }
    catch(e){
        return Promise.reject('Token invalido')
    }
    return Promise.resolve(info);
    
}

module.exports = {
    generarToken,
    desifraToken
}

