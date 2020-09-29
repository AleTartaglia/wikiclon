const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require("./routes")
const nunjucks = require("nunjucks")
const app = express();
const models = require("./models")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//***********MIDDLEWARE DE LOGEO CON MORGAN************
app.use(morgan('tiny'))

//*******REQUIRO RUTAS*********/
app.use("/", routes)

//********EXPRESS STATIC************/
app.use(express.static('./public'))

//********NUNJUCKS***********/
// apuntá nunjucks al directorio conteniendo templates y apagando el cacheo,
// configure devuelve una instancia Enviornment que vamos a querer usar para
// agregar Markdown después.
var env = nunjucks.configure('views', { noCache: true });
// hace res.render funcionar con archivos html
app.set('view engine', 'html');
// cuando res.render funciona con archivos html, haz que use nunjucks para eso.
app.engine('html', nunjucks.render);

//***********ARCHIVOS PUBLIC************
app.use(express.static('./public'))

// Asegurate de estar exportando tu db del archivo de tus modelos
models.db.sync()
  .then(function () {
    // asegurate de reemplazar el nombre de abajo con tu app de express
    app.listen(3000, function () {
      console.log('Server is listening on port 3000!');
    });
  })
  .catch(console.error);