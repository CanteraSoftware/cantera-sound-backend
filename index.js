const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
// prueba
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');



const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 5000;

// prueba
app.use(fileUpload({
  //para utilizar los archivos que se encuentran aqui mismo
  useTempFiles: true,
  // donde se va guardar
  tempFileDir: './uploads'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co', 'http://127.0.0.1:5500', , 'http://localhost:5173/', 'http://localhost:5000', 'http://localhost:5000/public', 'http://18.117.98.49:5000/api/v1/', 'http://18.117.98.49:5000/api/v1/categories', 'http://18.117.98.49:5000/api/v1/genders', 'http://18.117.98.49:5000/api/v1/files'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.use((req, res, next) => {
  // Dominio que tengan acceso (ej. 'http://example.com')
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Metodos de solicitud que deseas permitir
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
})

routerApi(app)

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi port ${port}`);
})