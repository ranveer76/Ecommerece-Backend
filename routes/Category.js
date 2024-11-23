const express=require("express")
const categoryController=require("../controllers/Category")
const router=express.Router()

router
    .get("/", categoryController.getAll)
    .post("/", categoryController.create)
    .put("/:id", categoryController.update)

    
module.exports=router