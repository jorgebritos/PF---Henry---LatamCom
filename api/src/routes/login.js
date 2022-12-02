const { Router } = require("express");
const router = Router();
const loginController = require('./../Controllers/loginController');

router.get('/', loginController.authTokenRouter)

router.post('/log', loginController.authTokenRouterPerf)


module.exports = router