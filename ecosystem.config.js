module.exports = {
  apps: [{
    name: 'slackbot',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-216-77-7.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/sam-2.pem',
      ref: 'origin/master',
      repo: 'git@github.com:sampiper/slackbot.git',
      path: '/home/ubuntu/slackbot',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
