const Router = require("express");
const {jwtVerify, SignJWT} =require("jose");
const {User}= require("../db.js");

// import validateLoginDTO from "../dto/validate_login_dto.js";
const {authByEmailPwd} = require("../helpers/auth-by-email-pwd.js");

//Login con email y password
const authTokenRouterLog = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).send("Incomplete loginForm credentials")
  try {
    const searchUser = await User.findOne({
      where: { email: email }
    })
  //En caso de usuario registrado
  if(!searchUser) return res.status(401).send("Unregistered user");

  //En caso de password incorrecto
  if(searchUser.password !== password) return res.status(401).send("Incorrect password");

  let id = searchUser.id
  
  //GENERAR TOKEN Y DEVOLVER TOKEN
  const jwtConstructor = new SignJWT({id});
  
  const encoder = new TextEncoder();
  const jwt = await jwtConstructor
  .setProtectedHeader({ alg: "HS256", typ: "JWT" })
  .setIssuedAt()
  .setExpirationTime("1d")
  .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
  
    return res.send({ jwt, user: searchUser.dataValues });
  } catch (err) {
    return res.sendStatus(401);
  }
};

//Solicitud autenticada con token para obtener el perfil del usuario
const authTokenRouterPerf = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);
  console.log(authorization);
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    console.log(payload.id);
    console.log("user antes..");
    const user = await User.findOne({where: {id:payload.id}});
    console.log("user dice...");
    console.log(user);
    if (!user) {return res.sendStatus(401);
}
    delete user.password;

    return res.send(user);
  } catch (err) {
    return res.sendStatus(401);
  }
};

module.exports={
  authTokenRouterLog,
  authTokenRouterPerf
}