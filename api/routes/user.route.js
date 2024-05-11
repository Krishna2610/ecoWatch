import express from 'express';
import { test } from '../controllers/user.controller.js';

const router= express.Router();
// get is to get the info and post is to send to db
//putting the details like res.json here is not ssafe hence controllers is formed 
// router.get('/test',(req,res)=>{
//     res.json({ message:"Hello World!"})
// })
router.get('/test',test)


export default router;