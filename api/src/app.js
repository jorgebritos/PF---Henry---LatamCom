const express = require('express');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const routes = require('./routes/index.js');
require('dotenv').config();
require('./db.js');

// const { expressjwt: jwt } = require('express-jwt');
// const jwks = require('jwks-rsa');
// const guard = require('express-jwt-permissions')();

const server = express();
server.name = 'API';

// const jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//       cache: true,
//       rateLimit: true,
//       jwksRequestsPerMinute: 5,
//       jwksUri: 'https://dev-g1jtn0qvoq0x04y4.us.auth0.com/.well-known/jwks.json'
// }),
// audience: 'https://www.PF---Henry---LatamCom.com',
// issuer: 'https://dev-g1jtn0qvoq0x04y4.us.auth0.com/',
// algorithms: ['RS256']
// });

// server.use(jwtCheck);
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
// server.use(cookieParser());
// server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// server.get('/authorized', guard.check(['read:PF-Henry']), function (req, res) {
//   res.json({PFHenry:"this is the first PFHenry", PFHenry2:"this onther PFHenry"});
// });

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// server.listen(3030)

module.exports = server;
