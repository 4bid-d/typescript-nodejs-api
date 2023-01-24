import { Router, Response, Request, NextFunction} from  "express"
import Post from "../../models/post";
import Comment from "../../models/comment";

const router = Router()
router.delete("/api/comment/:commentId/delete/:postId",async (req :Request ,
// router.delete("/:id",async (req :Request ,
    res :Response,
    next : NextFunction
   )=>{
    const {postId , commentId}  = req.params ;

    if(!postId || !commentId){
        const error  = new Error("post id and comment id is required") as CustomError
        error.status = 400
        next(error)
    }

    try {
        await Comment.findOneAndRemove({_id:commentId})
    } catch (error) {
        next(new Error("Comment cannot be updated"))
    }

    await Post.findOneAndUpdate(
        {_id : postId},
        {$pull:{
            comments:commentId.toString()
        }}
        // {overwrite:true}
    )
    res.status(200).json({success:true})
})

export {router as deleteCommentRouter}
// module.exports = router 