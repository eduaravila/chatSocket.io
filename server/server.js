const path = require('path'); //rutas entre archivos 
const express= require('express');
const app = express();


let publicos = path.join(__dirname , '../public');
console.log(publicos);
app.use(express.static(publicos));

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

