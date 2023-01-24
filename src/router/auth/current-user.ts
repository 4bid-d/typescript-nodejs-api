import { Router  , Request, Response, NextFunction } from "express"
import { currentUser } from "../../../common"
const router  = Router()

router.get("/current-user",
currentUser,
(req:Request,res:Response,next:NextFunction)=>{
    console.log("current user")
    res.status(200).json({currentUser:req.currentUser})
})

export {router as currentUserRouter}