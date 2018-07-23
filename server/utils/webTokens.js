let jwt = require('jsonwebtoken');



let generarToken = (usuario,pass,ingreso,sala)=>{
 return jwt.sign({usuario,pass,ingreso,sala},process.env.SECRETO)

}
let desifraToken = (token)=>{
    try{
    var info = jwt.verify(token,process.env.SECRETO);
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

