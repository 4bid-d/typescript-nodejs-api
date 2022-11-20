import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },

    password:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
})

userSchema.pre("save",async(done)=>{
    
})

export const User = mongoose.model("User", userSchema)