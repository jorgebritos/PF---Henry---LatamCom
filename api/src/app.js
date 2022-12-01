const express = require('express');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

const jwt = require('jsonwebtoken');
const keys = require('./settings/keys');


server.name = 'API';

server.set('key', keys.key)
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
// server.use(cookieParser());
// server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);
// server.get('/', (req,res)=>{
//   res.send('Hola Mundo')
// })

server.post('/',(req,res)=>{
  if(req.body.user == 'admin' && req.body.pass =='12345'){
    const payload = {
      check:true
    };
    const token = jwt.sign(payload, server.get('key'),{
      expiresIn:'3d'
    });
    res.json({
      message:'Log in Succesful!',
      token:token
    });
  }else{
    res.json({
      message:'Incorrect user or password, check your credentials!'
    })
  }
});
//Middleware
const verification = express.Router();

verification.use((req, res, next)=>{
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  // console.log(token);
  if(!token){
    res.status(404).send({
      error:'Authentification token is required!'
    })
    return
  }
  if(token.startsWith('Bearer ')){
    token= token.slice(7,token.length);
    console.log(token)
  }
  if(token){
    jwt.verify(token, server.get('key'), (error,decoded)=>{
      if(error){
        return res.json({
          message:'Invalid Token!'
        });
      }else{
        req.decoded = decoded;
        next();
      }
    })
  }
})
server.get('/', verification,(req,res)=>{
  res.json('Important information delivered');
})

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
