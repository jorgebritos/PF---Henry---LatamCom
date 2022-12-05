const  {User} = require("../db");


const authByEmailPwd = (email, password) => {
  const user = /*User.find((u) => u.email === email);*/ false

  if (!user) {
    try {
        let users = require("../JSON/users.json")
        let userfil = users.filter((u) => {
          if(u.email === email) return {email:u.email,id:u.id,password:u.password}
        }
      );
      if(password === userfil[0].password){ 
        return userfil[0].id 
      }else{return false}


     
    } catch (error) {
        return false
    }

  /* if (user.password !== req.body.password) res.status(400).send("wrong pass"); */

  return user;
};
}
module.exports={
    authByEmailPwd
  }