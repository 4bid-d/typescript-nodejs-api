import { Request , Response , NextFunction} from "express" 
import jwt  from "jsonwebtoken"

declare global{
    interface JwtPayload {
        email:string,
        password :string
    }
    namespace Express{
        interface Request{
            currentUser? : JwtPayload 
        }
    }
}

export const currentUser = ( req : Request , res :Response , next: NextFunction)=>{
    if(!req.session?.jwt){
        return next()
    }
    try {
        const payLoad = jwt.verify(req.session?.jwt, process.env.JWT_TOKEN!) as JwtPayload
        req.currentUser = payLoad;
        next()

    } catch (error) {
        return next(error)
    }

} 