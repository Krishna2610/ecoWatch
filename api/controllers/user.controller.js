import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js"
export const test= (req,res)=>{
    res.json({ message:"API route is working"})
}

//if the user we got and teh user we are trying to change are not same then 
export const updateUser= async (req,res,next)=>{
if (req.user.id!== req.params.id) 
    return next(errorHandler(401,"You can only update your own accont!"))
try {
    if(req.body.password){
        req.body.password=bcryptjs.hashSync(req.body.password,10)
    }
    const updatedUser=await User.findByIdAndUpdate(req.params.id,{
        // Set is uspasswordbecause when we are updating some fields value might not have chnaged but will have to update all 
        $set:{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar
        }
    },
    // new true will return teh upadteed value 
    {new:true})

    const{password,...rest}=updatedUser._doc
    res.status(200).json(rest)
} catch (error) {
    next(error)
    
}
};