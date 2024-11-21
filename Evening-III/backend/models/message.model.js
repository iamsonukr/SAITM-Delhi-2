import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    author:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    }
})

const messageModel=mongoose.models.messages || mongoose.model('messages',messageSchema)

export default messageModel