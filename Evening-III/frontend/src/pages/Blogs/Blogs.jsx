import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Blogs.css'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()
  const getBlogs = async () => {
    try {
      const result = await axios.get('http://localhost:5004/api/allblogs')
      console.log(result.data.blogs)
      setBlogs(result.data.blogs);

    } catch (error) {

    }
  }

  useEffect(() => {
    getBlogs()
    console.log(blogs)
  }, [])

  const handelDelete = async (id) => {
    try {
      const deleteBlog = await axios.delete(`http://localhost:5004/api/blog/remove/${id}`)
      if (deleteBlog) {
        alert("Blog deleted successfully")
      }
    } catch (error) {

    }
  }

  return (
    <div>
      <div>
        <h1>Blogs are here</h1>
        <div className="blog-container">
          {blogs.map((item) => (
            <div className="blog-item" key={item._id}>
              <div className="blog-title">{item.title}</div>
              <div className="blog-author">{item.author}</div>
              <div className="blog-description">{item.description}</div>
              <div className="blog-buttons">
                <button
                  className="update-btn"
                  onClick={() => navigate(`/update/${item._id}`)}>Update
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handelDelete(item._id)}>Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs