const AWS = require('aws-sdk');
const s3 = new AWS.S3();

// configura el bucket y la clave de acceso de AWS aquí

const params = {
  Bucket: 'my-bucket',
  Key: 'my-object-key',
  Body: myFile // aquí va el archivo que se va a subir
};

s3.upload(params, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    const url = s3.getSignedUrl('getObject', {
      Bucket: 'my-bucket',
      Key: 'my-object-key',
      Expires: 3600 // la URL expira en 1 hora
    });

    console.log(`URL pública de S3 para el objeto subido: ${url}`);
  }
});