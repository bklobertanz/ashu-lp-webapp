const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const fs = require('fs');
const httpPort = 80;
const httpsPort = 443;
const https = require('https');
const http = require('http');


const cuidador = require('./routes/api/cuidador.js');
const familiar = require('./routes/api/familiar.js');
const contacto = require('./routes/api/contacto.js');

//Añado cert y key 

const cert = fs.readFileSync('./certs/certificate.pem');
const key = fs.readFileSync('./certs/key.pem');

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer({key,cert},app);

app.use((req,res,next)=>{
   if(req.protocol === 'http')
   {
      res.redirect(301,`https://${req.headers.host}${req.url}`);
   }
   next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(urlencodedParser);

app.get('/', (req,res)=>{
   res.sendFile(__dirname + '/public/index.html');
});
app.use('/cuidador', cuidador);
app.use('/familiar', familiar);
app.use('/contacto', contacto);

httpServer.listen(httpPort,()=>console.log(`Servidor escuchando en puerto ${httpPort}`));
httpsServer.listen(httpsPort,()=> console.log(`Servidor escuchando en puerto ${httpsPort}`));