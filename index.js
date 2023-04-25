const express = require('express')
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express()

<<<<<<< HEAD

=======
//cambio
>>>>>>> 6845bf6beeca937f582b745702487c457386a112
const port = process.env.PORT || 5000

app.use(express.json());

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

routerApi(app)
app.listen(port, () => {
  console.log(`Mi port ${port}`);
})