import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
//async is used to enable await as saving to db takes time 
export const signup= async(req,res)=>{
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
    res.status(500).json(error.message)
 }
}