// Write your code here
import './index.css'

const CommonItem = props => {
  const {commentsDetails, toggleIsLiked, deleteComment} = props
  const {id, name, comment, time, liked, bg} = commentsDetails

  const likeToggled = () => {
    toggleIsLiked(id)
  }

  const commentDeleted = () => {
    deleteComment(id)
  }

  const likedTitle = liked ? 'liked-title' : ''

  const likeImgUrl = liked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li className="comment-item">
      <div className="text-container">
        <div className={`letter-container ${bg}`}>
          {name.slice(0, 1).toUpperCase()}
        </div>
        <div className="comment-box">
          <div className="commenter-details">
            <p className="commenter-name">{name}</p>
            <p className="commenter-time">{time} ago</p>
          </div>
          <p className="commenter-comment">{comment}</p>
        </div>
      </div>
      <div className="logo-container">
        <div className="like-container">
          <button
            type="button"
            className="like-delete-btn"
            onClick={likeToggled}
          >
            <img className="logo" src={likeImgUrl} alt="like-icon" />
          </button>
          <p className={`like-title ${likedTitle}`}>Like</p>
        </div>
        <button
          type="button"
          className="like-delete-btn"
          onClick={commentDeleted}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="logo"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommonItem
