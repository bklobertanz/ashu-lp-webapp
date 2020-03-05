const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = process.env.PORT || 80;


const cuidador = require('./routes/api/cuidador.js');
const familiar = require('./routes/api/familiar.js');
const contacto = require('./routes/api/contacto.js');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(urlencodedParser);

app.get('/', (req,res)=>{
   res.sendFile(__dirname + '/public/index.html');
});
app.use('/cuidador', cuidador);
app.use('/familiar', familiar);
app.use('/contacto', contacto);

app.listen(port, ()=> console.log(`Servidor escuchando en puerto ${port}`));