import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogService'
import loginService from './services/loginService'
import { useField } from './hook'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const password = useField('password')
  const username = useField('text')
  const title = useField('text')
  const url = useField('text')
  const author = useField('text')

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [update])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.object.value,
        password: password.object.value
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (exception) {
      setMessage('Try again!')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const addBlog = async event => {
    event.preventDefault()
    try {
      const blogObject = {
        user: user,
        title: title.object.value,
        author: author.object.value,
        url: url.object.value
      }
      const auth = user.token
      blogService.create(blogObject, auth).then(blog => {
        setBlogs(blogs.concat(blog))
        author.reset()
        title.reset()
        url.reset()
        setMessage(`a new blog with the title: ${blogObject.title} by ${blogObject.author} added`)
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('Blog not added')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin} className="login">
      <h2>Log in to the blog application:</h2>
      <div>
        Username:
        <input {...username.object} />
      </div>
      <div>
        Password:
        <input {...password.object} />
      </div>
      <button type="submit">Log in</button>
    </form>
  )

  const blogForm = () => (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} setUpdate={setUpdate} user={user} />
        ))}
    </div>
  )

  const newBlogFrom = () => (
    <form onSubmit={addBlog}>
      <div> <h2>Create new blog</h2></div>
      <div>
        Title:
        <input {...title.object} />
      </div>
      <div>
        Author:
        <input {...author.object} />
      </div>
      <div>
        Url:
        <input {...url.object} />
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}> logout</button>
          {blogForm()}
          <br />
          <Togglable buttonLabel="Create New Blog">{newBlogFrom()}</Togglable>
        </div>
      )}
    </div>
  )
}

export default App