import { Router, Response, Request, NextFunction} from  "express"
import Post from "../../models/post";

const router = Router()
router.delete("/api/post/delete/:id",async (req :Request ,
// router.delete("/:id",async (req :Request ,
    res :Response,
    next : NextFunction
   )=>{
    const {id }  = req.params ;
    if(!id){
        const error  = new Error("post id is required") as CustomError
        error.status = 400
        next(error)
    }

    try {
        await Post.findOneAndRemove({_id:id})
    } catch (error) {
        next(new Error("post cannot be updated"))
    }

    res.status(200).json({success:true})
})

export {router as deletePostRouter}
// module.exports = router 