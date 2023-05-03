const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const fileUpload = require('express-fileupload');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload({
  //para utilizar los archivos que se encuentran aqui mismo
  useTempFiles: true,
  // donde se va guardar
  tempFileDir: './uploads'
}));

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

routerApi(app)

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi port ${port}`);
})