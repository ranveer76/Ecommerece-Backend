require("dotenv").config()
const express=require('express')
const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const authRoutes=require("./routes/Auth")
const productRoutes=require("./routes/Product")
const orderRoutes=require("./routes/Order")
const cartRoutes=require("./routes/Cart")
const brandRoutes=require("./routes/Brand")
const categoryRoutes=require("./routes/Category")
const userRoutes=require("./routes/User")
const addressRoutes=require('./routes/Address')
const reviewRoutes=require("./routes/Review")
const wishlistRoutes=require("./routes/Wishlist")
const { connectToDB } = require("./database/db")


const server=express()

connectToDB()


server.use(cors({origin:process.env.ORIGIN || "http://localhost:3000",credentials:true,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PATCH','DELETE']}))
server.use(express.json({
    limit: "50mb"
}))
server.use(cookieParser())
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(morgan("tiny"))

server.use("/auth",authRoutes)
server.use("/users",userRoutes)
server.use("/products",productRoutes)
server.use("/orders",orderRoutes)
server.use("/cart",cartRoutes)
server.use("/brands",brandRoutes)
server.use("/categories",categoryRoutes)
server.use("/address",addressRoutes)
server.use("/reviews",reviewRoutes)
server.use("/wishlist",wishlistRoutes)



server.get("/", (req, res) => {
    res.status(200).json({message:'running'})
})

server.listen(8000, () => {
    console.clear();
    console.log('server [STARTED] ~ http://localhost:8000');
})