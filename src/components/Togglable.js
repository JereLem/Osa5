import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const hiddenStyle = { display: isVisible ? 'none' : '' }
  const visibleStyle = { display: isVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }))

  return (
    <div>
      <div style={hiddenStyle}>
        <button id="toggle-btn" onClick={toggleVisibility}>
Create a new blog
        </button>
      </div>
      <div style={visibleStyle}>
        {props.children}
        <button id="cancel-btn" onClick={toggleVisibility}>
Cancel
        </button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable