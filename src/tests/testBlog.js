const testBlog = ({ blog, onClick }) => {
  return (
    <div>
      <div className="titleauthor">
        {blog.title} {blog.author}
      </div>
      <div className="likes">
        {blog.likes}
        <button className="like" onClick={onClick}>like
        </button>
      </div>
    </div>
  )
}

export default testBlog