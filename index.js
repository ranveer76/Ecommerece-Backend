require("dotenv").config()
const express=require('express')
const cors = require('cors')
const path = require('path')
const cookieParser=require("cookie-parser")
const { connectToDB } = require("./database/db")
const logger = require("./middleware/logger")


const server=express()

connectToDB()


server.use(cors({origin:process.env.ORIGIN || "http://localhost:3000",credentials:true,exposedHeaders:['X-Total-Count'],methods:['GET','POST','PATCH','DELETE']}))
server.use(express.json({
    limit: "50mb"
}))
server.use(cookieParser())
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public'))
server.use(logger)

server.use("/api", require("./routes/index"))

server.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

server.listen(8000, () => {
    console.clear();
    console.log('server [STARTED] ~ http://localhost:8000');
})