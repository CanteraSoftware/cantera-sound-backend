require('dotenv').config();


const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  bucketName: process.env.AWS_BUCKET_NAME,
  bucketRegion: process.env.AWS_BUCKET_REGION,
  publicKey: process.env.AWS_PUBLIC_KEY,
  secretKey: process.env.AWS_SECRET_KEY,
  apiKey: process.env.API_KEY
}

module.exports = { config };
