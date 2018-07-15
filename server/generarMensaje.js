let generarMensaje = (de,mensaje)=>{
    return{
        de,
        mensaje,
        hora: new Date().getTime()
    }
};
module.exports = {generarMensaje};