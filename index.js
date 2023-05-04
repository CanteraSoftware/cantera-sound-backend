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

app.use(cors());

routerApi(app)

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi port ${port}`);
})