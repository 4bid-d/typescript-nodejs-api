import express,{Request , Response, NextFunction} from "express"
import {json ,urlencoded} from "body-parser"
import mongoose from "mongoose"
// import * as dotenv from "dotenv"
require('dotenv').config()
// dotenv.config()
const app = express()
const updatePostRouter = require("./router/update")
const showPostRouter = require("./router/show")
const deletePostRouter = require("./router/delete")
const newPostRouter = require("./router/new")

app.use(urlencoded({
    extended:true
}))

app.use(json())

declare global {
    interface CustomError extends Error {
        status?: number
    }
}

app.use((error:CustomError, req:Request, res:Response, next:NextFunction)=>{
    if(error.status){
        return res.status(error.status).json({message:error.message})
    }
    res
    .status(500)
    .json({message:error.message})
})

const start = async ()=>{
    if(process.env.MONGO_URI === undefined ) throw new Error("MONGO_URI doesnt exists.")

    try {
        await mongoose.connect(process.env.MONGO_URI ,()=>{
            console.log("connected")
        })  
    } catch (error) {
        throw new Error(`${error}`)
    }
}
app.use("/api/post/new",newPostRouter)
app.use("/api/post/delete",deletePostRouter)
app.use("/api/post/show",showPostRouter)
app.use("/api/post/update",updatePostRouter)

start()


app.listen(3000, ()=>{ console.log("server started.")})