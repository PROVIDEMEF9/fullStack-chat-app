import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { cloudinary } from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
// const { Message } = require("../models/message.model");
// const { User } = require("../models/user.model");
// const { cloudinary } = require("../lib/cloudinary");
// const { getReceiverSocketId, io } = require("../lib/socket");

export const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
    
        res.status(200).json(filteredUsers);
        
    } catch (error) {
        console.log("Error in getUsersForSidebar",error.message);
    res.status(500).json({message:"Internal server error"});
    }

   

}

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const myId=req.user._id;
       
        const messages=await Message.find({$or:[
           {senderId:myId,receiverId:userToChatId},
           {senderId:userToChatId,receiverId:myId}
       ]})
       
         res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage",error.message);
        res.status(500).json({message:"Internal server error"});
        }
    }

 export const sendMessages=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const{id:receiverId}=req.params;
        const senderId=req.user._id;
    
        let imageURL;
        if(image){
            //upload image to cloudinary
    
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageURL=uploadResponse.secure_url;
        }
    
        const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image:imageURL,
        });
    
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessages",newMessage);
        }
    
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage",error.message);
        res.status(500).json({message:"Internal server error"});
    }
  
}

