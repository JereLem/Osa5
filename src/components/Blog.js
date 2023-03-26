import React, { useState } from 'react'
import blogService from '../services/blogService'

const blogStyles = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, onUpdate, user }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isRemovable, setIsRemovable] = useState(false)

  const hiddenStyle = { display: isVisible ? 'none' : '' }
  const visibleStyle = { display: isVisible ? '' : 'none' }
  const removableStyle = { display: isRemovable ? '' : 'none' }

  const handleClick = () => {
    setIsVisible(true)
    if (blog.user.username !== user.username) {
      setIsRemovable(true)
    }
  }

  const handleLike = async event => {
    event.preventDefault()
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(blog.id, updatedBlog)
    onUpdate(Math.floor(Math.random() * 100))
  }

  const handleRemove = async event => {
    event.preventDefault()
    if (window.confirm(`Remove blog with title ${blog.title} by ${blog.author}`)) {
      blogService.setToken(user.token)
      await blogService.remove(blog.id)
      onUpdate(Math.floor(Math.random() * 100))
    }
  }

  return (
    <div style={blogStyles} className="blog">
      <div style={hiddenStyle}>
        <div onClick={handleClick} className="title-author">
          {blog.title} {blog.author}
        </div>
      </div>
      <div style={visibleStyle} className="details">
        <div className="title">{blog.title}</div>
        <div className="url">{blog.url}</div>
        <div className="likes">
          {blog.likes} likes{' '}
          <button type="button" onClick={handleLike}>Like
          </button>
        </div>
        <div style={removableStyle} className="author">added by {blog.author}
          <button type="button" onClick={handleRemove}>Remove
          </button>
        </div>
      </div>
    </div>
  )
}

export default Blog