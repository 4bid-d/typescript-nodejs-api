import { Router  , Request,
         Response, NextFunction } from "express"
import Comment from "../../models/comment"
import Post from "../../models/post" 
const router = Router()

router.post("/api/comment/new/:postId",async (req :Request ,
// router.post("/",async (req :Request ,
     res :Response,
     next : NextFunction
    )=>{
    const  {username , content } =  req.body 
    const {postId } = req.params

    if(!content){
        const error = new Error("Content is required") as CustomError
        error.status = 400
        next(error)
    }

    const newComment = new Comment({
        username :  username ? username :"anonymous",
        content
    })

    await newComment.save()
    const updatePost = await Post.findByIdAndUpdate(
        {_id :postId },
        {$push : {comments : newComment}},
        {new:true}
    )
    res.status(201).send(newComment)

})

export {router as newCommentRouter}
// module.exports = router 