 import express from 'express'
import mongoose from 'mongoose'
import messageModel from './models/message.model.js'
import cors from 'cors'


const app=express()
app.use(express.json())
app.use(cors())

// Function to connect MongoDB
const connectDataBase=async(req,res)=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/')
        .then(()=>{
            console.log("DataBase Connected")
        })
    } catch (error) {
        console.log("Error connecting database", error)
    }
}

connectDataBase()

app.post('/api/create',async(req,res)=>{
    // console.log(req)

    const {author,title,description}=req.body
    try {
        const newBlog=new messageModel({
            author,title,description
        })

        await newBlog.save()
        console.log("Blog Saved")
        res.send({success:true,message:"Blog Creation successfull"})
    } catch (error) {
        console.log(error)
        res.send({success:false,message:"message creation failed"})
    }
})

app.delete('/api/blog/remove/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const deleteBlog=await messageModel.findByIdAndDelete(id)
        res.send({success:true,message:"Blog Deleted Successfully"})
    } catch (error) {
        res.send({success:false,message:"Blog Deletion failed"})
    }
})

app.put('/api/blog/update/:id',async(req,res)=>{
    const {id}=req.params
    const {title,description,author}=req.body
    try {
        const updatedBlog=await messageModel.findByIdAndUpdate(id,{
            title,description,author
        })
        if(updatedBlog){
            res.send({success:true,message:"Blog updated successfully"})
        }
    } catch (error) {
        res.send({success:false,message:"Blog updatedation failed"})
        
    }
})

app.get('/api/allblogs',async(req,res)=>{
    try {
        const blogs=await messageModel.find({})
        res.send({success:true,blogs:blogs})
    } catch (error) {
        res.send({success:false,message:"Blogs not found"})
        
    }
})

app.get('/api/blog/:id',async(req,res)=>{
    const {id}=req.params
    try {
        const blogs=await messageModel.findById(id)
        res.send({success:true,blogs:blogs})
    } catch (error) {
        res.send({success:false,message:"Blogs not found"})
        
    }
})




app.listen(5004,()=>{
    console.log("Server is running")
})