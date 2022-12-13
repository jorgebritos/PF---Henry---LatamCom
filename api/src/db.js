require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,DB_DEPLOY
} = process.env;

 const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
   logging: false, // set to console.log to see the raw SQL queries
   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
 });
/* const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
}); */
const basename = path.basename(__filename);

const modelDefiners = [];
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Category, Comment, Product, Purchase, User } = sequelize.models;

// Aca vendrian las relaciones
Product.belongsToMany(User, { as:"favorites", through: "favorites_user" })
User.belongsToMany(Product, { as:"favorites",through: "favorites_user" })

Product.belongsToMany(User, { as:"cart", through: "cart_user" })
User.belongsToMany(Product, { as:"cart",through: "user_cart" })

Product.belongsToMany(Comment, { through: "products_comments" })
Comment.belongsToMany(Product, { through: "products_comments" })

Product.belongsToMany(Category, { through: "products_categories" })
Category.belongsToMany(Product, { through: "products_categories" })

User.belongsToMany(Purchase, { through: "users_purchases" })
Purchase.belongsToMany(User, { through: "users_purchases" })

User.belongsToMany(Comment, { through: "users_comments" })
Comment.belongsToMany(User, { through: "users_comments" })

User.belongsToMany(Comment, { as:"reported", through: "user_comment" })
Comment.belongsToMany(User, { as:"reported",through: "comment_user" })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
