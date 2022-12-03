const Router = require("express");
const {jwtVerify, SignJWT} =require("jose");
const User= require("../db.js");

// import validateLoginDTO from "../dto/validate_login_dto.js";
const authByEmailPwd = require("../helpers/auth-by-email-pwd.js");

//Login con email y password
const authTokenRouterLog = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { id } = authByEmailPwd(email, password);

    //GENERAR TOKEN Y DEVOLVER TOKEN
    const jwtConstructor = new SignJWT({ id });

    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send({ jwt });
  } catch (err) {
    return res.sendStatus(401);
  }
};

//Solicitud autenticada con token para obtener el perfil del usuario
const authTokenRouterPerf = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) return res.sendStatus(401);

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );

    const user = User.find((user) => user.id === payload.id);
    
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