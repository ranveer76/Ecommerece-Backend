const express = require('express')
const route = express.Router()
const authRoutes=require("./Auth")
const productRoutes=require("./Product")
const orderRoutes=require("./Order")
const cartRoutes=require("./Cart")
const brandRoutes=require("./Brand")
const categoryRoutes=require("./Category")
const userRoutes=require("./User")
const addressRoutes=require('./Address')
const reviewRoutes=require("./Review")
const wishlistRoutes = require("./Wishlist")

route.use(require("../middleware/VerifyToken").setifexist)

route.use("/auth",authRoutes)
route.use("/users",userRoutes)
route.use("/products",productRoutes)
route.use("/orders",orderRoutes)
route.use("/cart",cartRoutes)
route.use("/brands",brandRoutes)
route.use("/categories",categoryRoutes)
route.use("/address",addressRoutes)
route.use("/reviews",reviewRoutes)
route.use("/wishlist", wishlistRoutes)

route.use("*", (req, res) => {
    res.status(404).json({ message: "404 - Not Found" });
});

module.exports = route