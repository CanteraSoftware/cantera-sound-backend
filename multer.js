const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { Pool } = require('pg');

const router = express.Router();
const upload = multer(); // Configuración básica de multer para manejar archivos en memoria

// Creamos una instancia del cliente de AWS S3 y un objeto de configuración para el presigner
const s3 = new S3Client({ region: 'tu_region_de_s3' });
const presigner = {
  bucket: 'tu_bucket_de_s3',
  client: s3,
  expires: 3600 // Tiempo en segundos que la URL estará disponible para la descarga
};

// Creamos una instancia del pool de conexiones a la base de datos de PostgreSQL
const pool = new Pool({
  user: 'tu_usuario_de_postgres',
  host: 'tu_host_de_postgres',
  database: 'tu_base_de_datos_de_postgres',
  password: 'tu_contraseña_de_postgres',
  port: 5432
});

// Definimos la ruta para subir el archivo a AWS S3 y guardar la URL en la base de datos
router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  // Creamos un objeto de parámetros para enviar el archivo a AWS S3
  const params = {
    Bucket: 'tu_bucket_de_s3',
    Key: file.originalname,
    Body: file.buffer
  };

  try {
    // Enviamos el archivo a AWS S3 y obtenemos la URL de la ubicación del archivo
    const { Location } = await s3.send(new PutObjectCommand(params));
    console.log(`El archivo se ha subido correctamente a ${Location}`);

    // Generamos una URL firmada para la descarga del archivo
    const url = await getSignedUrl(s3, new PutObjectCommand({ ...params, ACL: 'public-read' }), presigner);

    console.log(`La URL del archivo subido es: ${url}`);

    // Insertamos los datos y la URL del archivo en la base de datos de PostgreSQL
    const { datos } = req.body;
    await pool.query('INSERT INTO tabla (datos, url) VALUES ($1, $2)', [datos, url]);

    console.log('Los datos se han insertado correctamente en la base de datos');
    res.status(200).send('Archivo subido correctamente a S3, URL insertada en la base de datos');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error al subir el archivo a S3 o insertar los datos en la base de datos');
  } finally {
    pool.end(); // Cerramos la conexión con la base de datos
  }
});

module.exports = router;