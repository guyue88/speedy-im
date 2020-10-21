module.exports = {
  apps: [{
    name: 'speedy-im',
    script: './dist/app.js',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
