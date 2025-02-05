const express=require('express')
const orderController=require("../controllers/Order")
const router=express.Router()

router
    .post("/capture", orderController.capturePayment)
    .post("/", orderController.create);
router
    .get("/", orderController.getAll)
    .get("/user/:id", orderController.getByUserId);
router
    .patch("/:id", orderController.updateById);


module.exports=router