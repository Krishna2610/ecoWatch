import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

//async is used to enable await as saving to db takes time 
export const signup = async (req, res, next) => {
// using console just prints the data but we need to save the data into the database hence it is removed
// console.log(req.body)
//get the values 
const {username,email,password}= req.body;
const hashedPassword=bcryptjs.hashSync(password,10)
//save in db
const newUser=new User({username,email,password:hashedPassword})
 try{
    await newUser.save()
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

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        } else {
            // As in model pass is req but with google we dont get pass hence a pass is created 
            // the last 8 digits of the random number is taken
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            //username shld be connected 
            const newUser = new User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email, password: hashedPassword, avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        }
    } catch (error) {
        next(error)
    }
}
// clearing the cookie
export const signout = async (req, res, next) => {
    try {

            res.clearCookie('access_token');
            res.status(200).json("User has been logged out!!");
        }
    catch (error) {
        next(error)
    }
}