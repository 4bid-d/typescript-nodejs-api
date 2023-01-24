import { Router  , Request,
         Response, NextFunction } from "express"
import Post from "../../models/post"

const router = Router()

router.post("/api/post/new",async (req :Request ,res :Response,next : NextFunction)=>{
    
    try {
        
        const  {title , content } =  req.body 
        console.log(title)
        if(!title || !content){
            const error = new Error("title and content are required") as CustomError
            error.status = 400
            // throw error
            return
        }
    
        const newPost = new Post({
            title:title ?? "none",
            content
        })
        await newPost.save()
    
        res.status(201).send(newPost)
    } catch (error) {
        next(error)
    }

})

export {router as newPostRouter}
// module.exports = router 