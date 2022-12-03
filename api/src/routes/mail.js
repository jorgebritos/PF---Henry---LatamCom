const { Router } = require("express");
const router = Router()
const mailController = require('../Controllers/MailController');


router.post('/', mailController.sendMail)

module.exports = router;