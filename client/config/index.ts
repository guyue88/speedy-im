import dev from './dev';
import prod from './prod';

type EnvType = 'local' | 'development' | 'production';
const env: EnvType = (process.env.NODE_ENV as EnvType) || 'local';

const configMap = {
  local: {},
  development: dev,
  production: prod,
};

const defaults = {
  baseUrl: 'http://localhost:8360',
  ws: {
    host: 'http://localhost:8360',
    namespace: 'chat',
  },
};

const config: any = {
  ...defaults,
  ...(configMap[env] || {}),
};

export default config;
