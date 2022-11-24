const { Router } = require("express");
const purchaseController = require('./../Controllers/PurchaseController');
const router = Router();


router.post("/", purchaseController.postPurchase)

router.get('/', purchaseController.getPurchase)


module.exports = router