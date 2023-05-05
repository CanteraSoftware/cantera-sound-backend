require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432
});
process.on('beforeExit', () => {
  pool.end();
  console.log('Connection pool closed');
});

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || ,
  dbUrl: process.env.DATABASE_URL,
  //
  bucketName: process.env.AWS_BUCKET_NAME,
  bucketRegion: process.env.AWS_BUCKET_REGION,
  publicKey: process.env.AWS_PUBLIC_KEY,
  secretKey: process.env.AWS_SECRET_KEY,
  apiKey: process.env.API_KEY
}

module.exports = { config, pool };