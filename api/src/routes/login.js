const { Router } = require("express");
const router = Router();
const loginController = require('./../Controllers/loginController');

router.post('/loginForm', loginController.authTokenRouterLog)

router.get('/profile', loginController.authTokenRouterPerf)


module.exports = router