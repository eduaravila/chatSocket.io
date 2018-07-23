const config = require('./locales.json'); //? json con las configuraciones 

let env  = process.env.NODE_ENV || "desarrollo";

if(env === 'desarrollo' || env === 'test'){
    console.log(config);
    const entorno = config[env];
    let llaves = Object.keys(entorno);
    llaves.forEach(element => {
        process.env[element] = entorno[element];
    });
}

