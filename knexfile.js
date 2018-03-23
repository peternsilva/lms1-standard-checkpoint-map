'use strict';

module.exports = {
  dev: {
    client: 'pg',
    connection: process.env.DATABASE_URL2
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL2
  }
};
