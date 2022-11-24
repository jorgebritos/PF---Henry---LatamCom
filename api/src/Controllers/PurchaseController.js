const { Purchase , User} = require("../db.js");



const getPurchase = async (req, res) => {

  let purchaseTable = await Purchase.findAll({
      include:[
          {
              model: User,
              attributes: ["username"],
              through: {
                  attributes: []
              }
          },
      ],
      
      order: [
          ['id', 'ASC']
      ]
  })

  res.send(purchaseTable);
}


const postPurchase = async (req,res)=>{

  try {
      
      const {products, totalPrice, idUser} = req.body
  
      const newPurchase = await Purchase.create({
          products,
          totalPrice
      })
  
      const searchUser = await User.findOne({
          where: { id: idUser }
      })
  
      if(searchUser){
          newPurchase.addUser(searchUser)
          res.status(200).send(newPurchase)
      }else{
          res.send("Missing Id")
      }
      
  
  } catch (error) {
      res.sendStatus(404)
  }
  
  }

module.exports = {
  getPurchase,
  postPurchase
}