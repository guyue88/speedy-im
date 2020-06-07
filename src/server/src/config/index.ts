import { Config as MysqlConfig } from '@hyoga/mysql';
import dev from './dev';
import prod from './prod';

type EnvType = 'local' | 'development' | 'production';

interface Config {
  mysql: MysqlConfig;
  jwt: {
    secret: string; // jwt加密秘钥
    routeWhiteList: string[];
  },
  passwordSecret: string; // 密码加密存储秘钥
}
const env: EnvType = (process.env.NODE_ENV as EnvType) || 'local';
const configMap = {
  local: {},
  development: dev,
  production: prod,
};

const defaults = {
  mysql: {
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '123456',
    database: 'speedy-im',
  },
  passwordSecret: 'speedy-im',
  jwt: {
    secret: 'speedy-im',
    routeWhiteList: [
      '/',
      '/favicon.ico',
      '/user/sign-in',
      '/user/sign-up',
    ],
  },
};

const config: Config = {
  ...defaults,
  ...(configMap[env] || {}),
};

export default config;
