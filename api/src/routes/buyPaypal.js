const { Router } = require("express");
const router = Router();
const BuyPaypalController = require("../Controllers/BuyPaypalController.js")

router.post("/createpayment",BuyPaypalController.createOrder)
router.get("/acceptpayment",BuyPaypalController.acceptOrder )
router.get("/cancelpayment",BuyPaypalController.cancelOrder)

module.exports = router