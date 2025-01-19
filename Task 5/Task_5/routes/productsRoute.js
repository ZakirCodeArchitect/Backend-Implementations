const express = require('express')
const router = express.Router();

const productsController = require("../controller/productsController")

router.post("/store", productsController.insertProducts);
router.get("/products", productsController.getProducts );
router.post("/price-range", productsController.certainProduct);
router.get("/expiredProducts", productsController.expiredProducts);
router.post("/certain-quantity", productsController.certainQuantity);
router.get("/firm", productsController.certainFirm);
router.delete("/expiredProducts", productsController.removeExpiredProducts)
router.put("/firm", productsController.updateFirmDetails);

module.exports = router;                                                                                                