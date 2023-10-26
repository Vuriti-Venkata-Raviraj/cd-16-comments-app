import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {commentsCount: 0, name: '', comment: '', commentList: [], bgCount: 0}

  changeBackgroundColor = () => {
    this.setState(prevIndex => ({
      bgCount:
        prevIndex.bgCount === initialContainerBackgroundClassNames.length - 1
          ? 0
          : prevIndex.bgCount + 1,
    }))
  }

  addComment = event => {
    event.preventDefault()
    this.changeBackgroundColor()
    const {name, comment, bgCount} = this.state
    const timeNow = formatDistanceToNow(new Date())
    const comments = {
      id: v4(),
      name,
      comment,
      bg: initialContainerBackgroundClassNames[bgCount],
      time: timeNow,
      liked: false,
    }

    this.setState(prev => ({
      commentsCount: prev.commentsCount + 1,
      commentList: [...prev.commentList, comments],
      name: '',
      comment: '',
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevComment => ({
      commentList: prevComment.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, liked: !eachComment.liked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    this.setState(prevComment => ({
      commentList: prevComment.commentList.filter(
        eachComment => eachComment.id !== id,
      ),
      commentsCount: prevComment.commentsCount - 1,
      bgCount:
        prevComment.bgCount !== 0
          ? prevComment.bgCount - 1
          : initialContainerBackgroundClassNames.length - 1,
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsCount, name, comment, commentList} = this.state

    return (
      <div className="main-container">
        <div className="comments-input-container">
          <div className="input-container">
            <h1 className="app-heading">Comments</h1>
            <p className="say-something-para">
              Say something about 4.0 Technologies
            </p>
            <form className="form-container" onSubmit={this.addComment}>
              <input
                className="name-input"
                onChange={this.onChangeName}
                value={name}
                type="text"
                placeholder="Your Name"
              />
              <textarea
                className="comment-textarea"
                onChange={this.onChangeComment}
                value={comment}
                placeholder="Your Comment"
                rows={15}
                cols={40}
              />
              <button className="add-comment" type="submit">
                Add Comment
              </button>
            </form>
          </div>
          <div className="img-container">
            <img
              className="comments-img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr />
        <div className="comments-container">
          <div className="comments-title">
            <div className="comments-count">{commentsCount}</div>
            <p className="comments-title-header">Comments</p>
          </div>
          <ul>
            {commentList.map(commentItem => (
              <CommentItem
                commentsDetails={commentItem}
                key={commentItem.id}
                toggleIsLiked={this.toggleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
