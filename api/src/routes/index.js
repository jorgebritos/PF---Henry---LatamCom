const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productsRoute = require("./products.js")
const categoriesRoute = require("./categories.js")
const usersRoute = require("./users.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', productsRoute)
router.use('/categories', categoriesRoute)
router.use('/users', usersRoute)

module.exports = router;
