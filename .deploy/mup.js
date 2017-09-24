module.exports = {
  servers: {
    one: {
      host: '51.15.200.175',
      username: 'root',
    }
  },
  app: {
    name: 'really-free-chat',
    path: '../../really-free-chat',

    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://really-free-chat.com'
    },
    ssl: {
      autogenerate: {
        email: 'postmaster@really-free-chat.com',
        domains: 'really-free-chat.com,www.really-free-chat.com'
      }
    },
    docker: {
      image: 'abernix/meteord:base',
    },
    enableUploadProgressBar: true
  },
  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};