import React from 'react'

const notification = ({ notify }) => {
  if (!notify) {
    return null
  }

  return (
    <div className={notify.type}>
      {notify.text}
    </div>
  )
}

export default notification