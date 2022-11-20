import { Router , Request , Response , NextFunction } from "express";
import {User } from "../../models/user"
import {authenticationService} from "../../../common"
import jwt from "jsonwebtoken"
const router = Router()


router.post("signin",async(req : Request , res :Response , next: NextFunction )=>{
    const {email , password } = req.body

    const user = await  User.findOne({email})
    if(!user) next(new Error("Wrong credential."))

    const isEqual = await authenticationService.pwdCompare(user!.password, password);

    if(!isEqual) return next(new Error("wrong Credentials"))

    const token = jwt.sign({email , userId:user!._id }, process.env.JWT_KEY! )
    req.session = {jwt : token }

    res.status(200).send(user)
}) 