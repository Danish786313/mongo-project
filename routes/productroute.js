const express = require("express")
const router = express.Router()
const productcontroller = require("../controller/productcontroller")
const fileuploade = require("../middleware/fileupload")

// router.param("productId", productcontroller.getproduct)

router.get("/product", productcontroller.getall)

router.post("/product", fileuploade.upload.single('productImage'), productcontroller.createproduct)

router.get("/product/:productId", productcontroller.findOne)

router.patch("/product/:productId", productcontroller.patchproduct)

router.delete("/product/:productId", productcontroller.deleteproduct)

module.exports = router