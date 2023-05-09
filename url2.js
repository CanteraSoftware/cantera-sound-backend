
Sí, se puede adaptar el código que te proporcioné para funcionar con las bibliotecas que estás utilizando.Aquí hay un ejemplo de cómo se podría hacer:

javascript
Copy code
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

// Cargar archivo a S3
async function cargarArchivoAS3(rutaLocal, nombreBucket, rutaS3) {
  const s3 = new S3Client({
    region: config.bucketRegion,
    credentials: {
      accessKeyId: config.publicKey,
      secretAccessKey: config.secretKey,
    },
  });

  const contenidoArchivo = fs.readFileSync(rutaLocal);

  const parametrosSubida = {
    Bucket: nombreBucket,
    Key: rutaS3,
    Body: contenidoArchivo,
  };

  const { Location } = await s3.send(new PutObjectCommand(parametrosSubida));
  console.log('Archivo cargado exitosamente. Ubicación:', Location);

  // Obtener la ubicación del archivo
  const parametrosHead = {
    Bucket: nombreBucket,
    Key: rutaS3,
  };

  const respuestaHead = await s3.send(new HeadObjectCommand(parametrosHead));
  const ubicacion = respuestaHead['$metadata'].httpHeaders.location;
  console.log('Ubicación del archivo:', ubicacion);
}

// Ejemplo de uso
cargarArchivoAS3('/ruta/al/archivo', 'nombre-del-bucket', 'ruta/en/s3/archivo');
Este código utiliza el cliente de S3 de AWS SDK para JavaScript para cargar un archivo en S3 y obtener su ubicación.El código utiliza el método readFileSync de Node.js para leer el contenido del archivo local y el método send de AWS SDK para enviar solicitudes HTTP a S3.También se utiliza la clase HeadObjectCommand para obtener información sobre el objeto cargado, incluyendo su ubicación.

Ten en cuenta que debes configurar las credenciales de AWS antes de ejecutar este código.También debes asegurarte de que la política de permisos del bucket de S3 permita la carga y descarga de archivos y que el SDK de AWS esté configurado correctamente.




