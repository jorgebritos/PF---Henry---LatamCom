const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const productsRoute = require("./products.js")
const categoriesRoute = require("./categories.js")
const usersRoute = require("./users.js")
const commentsRoute = require("./comments.js")
const purchaseRoute = require("./purchase.js")
const favoritesRoute = require("./favorites.js")
const loginRoute = require("./login.js")
const mailRoute = require("./mail.js")
const buyPaypalRoute = require("./buyPaypal.js")
const cartRoute = require("./cart.js")
const reportedRoute = require("./reported.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/products', productsRoute)
router.use('/categories', categoriesRoute)
router.use('/users', usersRoute)
router.use('/comments', commentsRoute)
router.use('/purchase', purchaseRoute)
router.use('/favorites', favoritesRoute)
router.use("/login", loginRoute)
router.use('/send-mail', mailRoute)
router.use('/buyings', buyPaypalRoute)
router.use('/cart', cartRoute)
router.use('/reported', reportedRoute)

module.exports = router;
