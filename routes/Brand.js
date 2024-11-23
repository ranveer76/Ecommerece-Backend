const express=require("express")
const brandController=require("../controllers/Brand")
const router=express.Router()

router
    .get("/", brandController.getAll)
    .post("/", brandController.create)
    .put("/:id", brandController.update)

module.exports=router