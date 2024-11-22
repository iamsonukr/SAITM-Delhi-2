import React, { useState } from 'react'
import axios from 'axios'
import './Create.css'

const Create = () => {
    const [blog,setBlog]=useState({
        author:"",
        title:"",
        description:""
    })

    const changeInput=(e)=>{
        // e.preventDefault()
        setBlog({...blog,[e.target.name]:e.target.value})
        console.log(blog)
    }

    const handelSubmit=async(e)=>{
        e.preventDefault()
        console.log("Subbmitting")
        try {
            const result=await axios.post('http://localhost:5004/api/create',blog)
            if(result){
                alert("Blog Saved successfully")
                console.log("Blog Saved successfully")
                setBlog({author:"",
                    title:"",
                    description:""})
            }
        } catch (error) {
            
        }
    }

  return (
    <div>
        <form onSubmit={handelSubmit}>
            <label htmlFor="">Author</label>
            <input type="text" name='author' value={blog.author} onChange={changeInput} />
            <br/>
            <label htmlFor="">Title</label>
            <input type="text" name='title' value={blog.title} onChange={changeInput} />
            <br/>
            <label htmlFor="">Description</label>
            <input type="text" name='description' value={blog.description} onChange={changeInput} />

            <button type='submit' >Submit</button>
            <br/>
        </form>
    </div>
  )
}

export default Create