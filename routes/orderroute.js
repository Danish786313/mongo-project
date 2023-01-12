const express = require("express")
const router = express.Router()
const ordercontroller = require("../controller/ordercontrooler")

router.post("/order", ordercontroller.createorder)

router.get("/order", ordercontroller.findAll)

router.get("/order/:orderId", ordercontroller.findOne)

router.patch("/order/:orderId", ordercontroller.patchorder)

router.delete("/order/:orderId", ordercontroller.deleteorder)

module.exports = router