const path = require('path'); //rutas entre archivos 
const express= require('express');
const app = express();

var puerto = process.env.PORT || 3000;
let publicos = path.join(__dirname , '../public');
console.log(publicos);
app.use(express.static(publicos));

app.listen(puerto, () => {
    console.log(`Escuchando desde el puerto ${puerto}`);
});

