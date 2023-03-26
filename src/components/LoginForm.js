import { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/loginService'
import blogService from '../services/blogService'

const LoginForm = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(formData)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setFormData({
        username: '',
        password: '',
      })
    } catch (exception) {
      // handle error
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Log in</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default LoginForm