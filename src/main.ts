import express,{Request , Response, NextFunction} from "express"
import {json ,urlencoded} from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
// import * as dotenv from "dotenv"
require('dotenv').config()
// dotenv.config()
const app = express()

import {
    //auth 
    currentUserRouter,
    signInRouter,
    signupRouter,
    //comment
    deleteCommentRouter,
    newCommentRouter,
    // post
    updatePostRouter,
    deletePostRouter,
    showPostRouter,
    newPostRouter    
} from "./router/index"
import cookieSession from "cookie-session"
import { requireAuth } from "../common"

const myLogger = function( req:Request, res:Response, next:NextFunction) {
    console.log("Request IP: " + req.ip);
    console.log("Request Method: " + req.method);
    console.log("Request date: " + new Date());
    
    next(); // THIS IS IMPORTANT!
  }
  
app.use(myLogger)
app.use(cors(
{
    origin:"*",
    optionsSuccessStatus:200
}
))

app.set("trust proxy",true) 
app.use(urlencoded({
    extended:false
}))

app.use(json())
app.use(cookieSession({
    signed:false,
    secure:false
}))
app.use(signInRouter)
app.use(signupRouter)
app.use(currentUserRouter)
app.use(requireAuth,newPostRouter)
app.use(requireAuth,deletePostRouter)
app.use(showPostRouter)
app.use(requireAuth,updatePostRouter)
app.use(requireAuth,newCommentRouter)
app.use(requireAuth,deleteCommentRouter)

app.all("*",(req,res,next)=>{    
    const err = new Error("not found") as CustomError
    err.status = 404
    next(err)
})

declare global {
    interface CustomError extends Error {
        status?: number
    }
}

app.use((error:CustomError, req:Request, res:Response, next:NextFunction)=>{
    if(error){
        res.status(error.status ?? 400).json({message:error.message})
        return
    }
    res
    .sendStatus(500)
    // .json({message:error.message})
})

const start = async ()=>{
    if(process.env.MONGO_URI === undefined ) throw new Error("MONGO_URI doesnt exists.")
    if(process.env.JWT_TOKEN === undefined ) throw new Error("JWT_TOKEN doesnt exists.")

    try {
        await mongoose.connect(process.env.MONGO_URI ,()=>{
            console.log("connected")
        })  
    } catch (error) {
        throw new Error(`${error}`)
    }
}

start()


app.listen(3000, ()=>{ console.log("server started.")})