import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

export default class Comments extends Component {
  state = {commentsList: initialCommentsList, name: '', comment: ''}

  onAddComment = event => {
    event.preventDefault()
    const initialClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const {name, comment} = this.state
    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      className: initialClassName,
    }
    if (name !== '' && comment !== '') {
      this.setState(preState => ({
        commentsList: [...preState.commentsList, newComment],
        name: '',
        comment: '',
      }))
    }
  }

  onChangeName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  onDeleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({
      commentsList: filteredCommentsList,
    })
  }

  onLikeComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state
    const count = commentsList.length
    return (
      <div className="comment-container">
        <div className="comments-card-container">
          <form className="text-container">
            <h1 className="comments-heading">Comments</h1>
            <p className="question">Say something about 4.0 Technologies</p>
            <input
              type="text"
              placeholder="Your Name"
              className="user-name"
              value={name}
              onChange={this.onChangeName}
            />
            <textarea
              className="comment-box"
              placeholder="Your comment"
              value={comment}
              onChange={this.onChangeComment}
            />
            <button
              type="submit"
              className="submit-btn"
              onClick={this.onAddComment}
            >
              Add comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="image"
          />
        </div>
        <div className="comments-container">
          <div className="count">
            <p className="comment-count">{count}</p>
            <p className="comments">Comments</p>
          </div>
          <ul className="comments-list">
            {commentsList.map(eachComment => (
              <CommentItem
                eachComment={eachComment}
                key={eachComment.id}
                onDeleteComment={this.onDeleteComment}
                onLikeComment={this.onLikeComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
