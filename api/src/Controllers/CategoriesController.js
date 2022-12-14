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

const postCategories = async (req, res) => {

  let { name } = req.body;

  try {

    let exists = await Category.findOne({
      where: { name: name }
    })

    if (!name) return res.status(404).send('Missing parameters');

    if (exists) return res.status(406).send("La Categoria ya existe");

    else {
      const newCategory = await Category.create({
        name
      });
      return res.status(200).send(newCategory);
    }

  } catch (error) {
    res.status(404).send(error);
  }
}

const putCategory = async (req, res) => {
  let { id, name } = req.body

  let category = await Category.findOne({
    where: { id, id }
  })

  category.name = name;

  await category.save()

  let categoryTable = await Category.findAll();

  res.send(categoryTable)
}

const deleteCategory = async (req, res) => {
  let { id } = req.params;
  
  
  await Category.destroy({ where: { id: id } });

  let categoryTable = await Category.findAll();

  res.send(categoryTable)
}

module.exports = {
  getCategories,
  postCategories,
  deleteCategory,
  putCategory
};