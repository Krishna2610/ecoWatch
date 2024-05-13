import express from 'express';
import { test,updateUser ,deleteUser,getUserListings,getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyuser.js';

const router= express.Router();
// get is to get the info and post is to send to db
//putting the details like res.json here is not ssafe hence controllers is formed 
// router.get('/test',(req,res)=>{
//     res.json({ message:"Hello World!"})
// })
router.get('/test',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)

export default router;