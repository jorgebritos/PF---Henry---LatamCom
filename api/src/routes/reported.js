const { Router } = require("express");
const router = Router()
const reportedController = require('./../Controllers/ReportedController');

router.post('/:id', reportedController.reportComment)

router.get('/', reportedController.getAllReported)

router.delete('/:id', reportedController.dismissReport)

module.exports = router;