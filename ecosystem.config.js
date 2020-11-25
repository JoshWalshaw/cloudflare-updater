module.exports = {
  apps : [
      {
        name: 'Cloudflare DNS Updater',
        script: './dist/Application.js',
      }
  ],
  deploy : {
    production : {
      user : 'josh',
      host : '192.168.0.40',
      port : '6063',
      ref  : 'origin/master',
      repo : 'git@gitlab.com:walshaw-home/cloudflare-updater.git',
      path : '/home/josh/cloudflare-updater',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && tsc && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
