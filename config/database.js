const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri : 'mongodb://localhost:27017/angular_2',
  secret : crypto,
  db : 'angular_2'
}
