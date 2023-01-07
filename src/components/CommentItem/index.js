import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {eachComment, onDeleteComment, onLikeComment} = props
  const {id, name, date, isLiked, comment, className} = eachComment

  const like = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const liked = isLiked ? 'liked' : ''

  const onLike = () => {
    onLikeComment(id)
  }

  const onDelete = () => {
    onDeleteComment(id)
  }
  return (
    <li className="comment-item">
      <div className="comment-top-container">
        <p className={`initial-color ${className}`}>{name[0]}</p>
        <p className="username">{name}</p>
        <p className="time">{formatDistanceToNow(date)}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="comment-low-container">
        <button
          type="button"
          className={`like-button ${liked}`}
          onClick={onLike}
        >
          <img src={like} alt="like" className="like-image" /> Like
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-image"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
