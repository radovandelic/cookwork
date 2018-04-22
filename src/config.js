/* eslint-disable no-unused-vars */
import path from 'path'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '/api',
    defaultEmail: 'noreply@cookwork.eu',
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    supportEmail: requireProcessEnv('SUPPORT_EMAIL'),
    transportOptions: {
      host: process.env.SMTP || 'smtp.mailgun.org',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: requireProcessEnv('MAILGUN_USER'),
        pass: requireProcessEnv('MAILGUN_PASS')
      }
    },
    cloudinaryConfig: {
      cloud_name: requireProcessEnv('CLOUD_NAME'),
      api_key: requireProcessEnv('CLOUD_KEY'),
      api_secret: requireProcessEnv('CLOUD_SECRET')
    },
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {
    mongo: {
      uri: process.env.DEVDB_URI || `mongodb://infzgbgd:${process.env.DB_PASS}@ds227858.mlab.com:27858/ngnix`,
      options: {
        debug: false
      }
    }
  },
  development: {
    mongo: {
      uri: process.env.DEVDB_URI || `mongodb://infzgbgd:${process.env.DB_PASS}@ds227858.mlab.com:27858/ngnix`,
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || '0.0.0.0',
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || process.env.DEVDB_URI || `mongodb://infzgbgd:${process.env.DB_PASS}@ds227858.mlab.com:27858/ngnix`,
      options: {
        db: {
          safe: true
        },
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
      }
    }
  }
}

module.exports = Object.assign(config.all, config[config.all.env])
export default module.exports
