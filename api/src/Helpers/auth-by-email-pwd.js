const  User =require("../db.js");


const authByEmailPwd = async (email, password) => {

  const user = User.find((u) => u.email === email);

  if (!user) {
    try {
        let users = require("../JSON/users.json")
        users = users.map((u) => {
            console.log(users)
        return {
            email: u.email,
            password: u.password,
        };
            });
    } catch (error) {
        res.status(404).send(error);
    }

  if (user.password !== password) throw new Error("wrong pass");

  return user;
};
}
module.exports={
    authByEmailPwd
  }