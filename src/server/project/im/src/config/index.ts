import dev from './dev';
import prod from './prod';

const env: string = process.env.NODE_ENV || 'local';

const configMap = {
  local: {},
  development: dev,
  production: prod,
};

const config = {
  mysql: {
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'speedy-im',
  },
};

export default {
  ...config,
  ...(configMap[env] || {}),
};
