const { Pool } = require('pg');

const { config } = require('./../config/config');

const options = {
  connectionString: config.dbUrl
};

if (config.isProd) {
  options.ssl = {
    rejectUnauthorized: false
  };
}

const pool = new Pool(options);

pool.end((err) => {
  if (err) {
    console.error('Failed close pool', err);
  } else {
    console.log('Sucess close pool');
  }
});

module.exports = pool;
