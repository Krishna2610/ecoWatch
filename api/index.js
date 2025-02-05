import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();
mongoose.connect(process.env.MONGO).then(() =>
     {console.log('Connected to MongoDB!');}).catch((err)=>{console.log(err)});

const app= express();
//to allow json as the input to server
app.use(express.json())
app.use(cookieParser())
app.listen(3000,()=> {console.log('Server is running on port 3000');});

// req is data we get from client side i.e from browser
//res is the data that is sent back from server 
// in http://localhost:3000/test we get hello world
// It is not safe and good to write everything here hence we have made a new routes folder in api
// app.get('/test',(req,res)=>{
//     res.send("Hello World!");
// });
//all routes defined here
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listing",listingRouter)
//a middleware is created to handle errors as it will be repititive
// "next" is to go to the next middle ware
app.use((err,req,res,next)=>{
const statusCode=err.statusCode || 500
 const message=err.message|| "Internal Server Error"
 return res.status(statusCode).json({
    sucess:false,
    statusCode,
    message
 })
})