const { Category } = require("../db.js");
const axios = require("axios");

const getCategories = async (req, res) => {
  let categoryTable = await Category.findAll()

  if (categoryTable.length > 0) return res.send(categoryTable)

  let apiInfo = await axios.get(`https://fakestoreapi.com/products/categories`);
  apiInfo = apiInfo.data.map(c => { return { name: c } })
  Category.bulkCreate(apiInfo)
  categoryTable = await Category.findAll()
  res.send(categoryTable);
}

module.exports = {
  getCategories
}