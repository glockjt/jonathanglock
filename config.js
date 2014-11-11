var config = {};

config.mail = {
  host: // hostname,
    secureConnection: true, // use ssl
    port: 465, // smtp secure port
    auth: {
        user: // username,
        pass: // password
    }
};

module.exports = config;