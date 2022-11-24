const { Category } = require("../db.js");
const axios = require("axios");

const getCategories = async (req, res) => {
  let categoryTable = await Category.findAll()

  if (categoryTable.length > 0) return res.send(categoryTable)

  let apiInfo = axios.get(`https://fakestoreapi.com/products/categories`)
  apiInfo.then( info => info.data.map(c => { return { name: c } }))
      .then(async info => {
          Category.bulkCreate(info)
          categoryTable = await Category.findAll()
          res.send(categoryTable);
      })
      .catch(error => console.error('Inside error:', error))
}

module.exports={
  getCategories
}