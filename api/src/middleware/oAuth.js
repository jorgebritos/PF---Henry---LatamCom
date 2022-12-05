// var axios = require("axios");

// const tokenEndpoint = 'https://dev-g1jtn0qvoq0x04y4.us.auth0.com/oauth/token';

//  oAuth = (req, res, next) => {
//   var code = req.query.code;

//   if(!code) {
//     res.status(401).send("Missing authorization code");
//   }

//   const params = new URLSearchParams();
//   params.append("grant_type", "authorization_code");
//   params.append("client_id", "jSKxgpG26EO0rS6t8vN35jzlpMo9gjPL");
//   params.append("client_secret", "O9E7x_Kv1c5UQ1S9VSuIChZkreymqq1vx1_bp1iKTMhEWga7f59HMN6zeh4GXqIU")
//   params.append("code", code);
//   params.append("redirect_uri", 'http://localhost:3000/home');

//   axios.post(tokenEndpoint, params)
//   .then(response => {
//     req.oauth = response.data;
//     next();
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(403).json(`Reason: ${err.message}`);
//   })
// }

// module.exports = oAuth;