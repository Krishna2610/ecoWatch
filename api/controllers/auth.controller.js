import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

//async is used to enable await as saving to db takes time 
export const signup= async(req,res,next)=>{
// using console just prints the data but we need to save the data into the database hence it is removed
// console.log(req.body)
//get the values 
const {username,email,password}= req.body;
const hashedPassword=bcryptjs.hashSync(password,10)
//save in db
const newUser=new User({username,email,password:hashedPassword})
 try{await newUser.save()
 res.status(201).json("User created successfully")
 }catch(error){
    // res.status(500).json(error.message)
    //  next(errorHandler(550,'error from the function'))  
    next(error) 
}
}

//sign in page
export const signin= async(req,res,next)=>{
const {email,password}=req.body;
try {
    const validUser=await User.findOne({email})
    if(! validUser) return next(errorHandler(404,"User not found!"))
    const validPassword =bcryptjs.compareSync(password,validUser.password)
    if(!validPassword) return next(errorHandler(401,"Wrong Credentials!"))
    const token =jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    //shld'nt send back the password to the user hence need to hide it 
    const {password:pass,...rest}=validUser._doc
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    // ,expires:new Date(Date.now() + 24* 60 * 60*1000)

    } catch (error) {
    next(error);
}
}