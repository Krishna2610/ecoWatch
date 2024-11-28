import mongoose from "mongoose";
const listingSchema =new mongoose.Schema(
    {issue:{
         type:String,
         required:true
     },
     description:{
         type:String,
         required:true        
     },
     address:{
         type:String,
         required:true
     },
    type:{
        type:String,
         required:true
     },
     imageUrls:{
         type:Array,
         required:true
     },
     userRef:{
        type:String,
         required:true
     }

     },
     {timestamps:true});
 
  // Model
  const Listing=mongoose.model('Listing',listingSchema);
 
 export default Listing;
 