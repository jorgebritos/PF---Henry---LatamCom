const express = require('express');
require('./db.js');
const server = express();
const { Router } = require("express");
const router = Router()

const jwt = require('jsonwebtoken');
const keys = require('./settings/keys');

// server.name = 'API';

router.set('key', keys.key)

router.post('/login',(req,res)=>{
    if(req.body.user == 'admin' && req.body.pass =='12345'){
      const payload = {
        check:true
      };
      const token = jwt.sign(payload, router.get('key'),{
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
      jwt.verify(token, router.get('key'), (error,decoded)=>{
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

router.get('/data', verification,(req,res)=>{
    res.json('Important information delivered');
})

module.exports = server;