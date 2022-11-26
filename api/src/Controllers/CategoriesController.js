const { Category } = require("../db.js");
const axios = require("axios");

const getCategories = async (req, res) => {


  try {
    let categoryTable = await Category.findAll();

    if (categoryTable.length > 0) return res.send(categoryTable);

    let apiInfo = ["electronics", "jewelery", "men's clothing", "women's clothing"];
    apiInfo = apiInfo.map(c => { return { name: c } });

    Category.bulkCreate(apiInfo);
    categoryTable = await Category.findAll();

    res.send(categoryTable);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {
  getCategories
};