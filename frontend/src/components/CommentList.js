import React, {Component} from 'react'
import Modal from 'react-modal'
// import Loading from 'react-loading'
// import * as API from './../utils/api.js'
import {connect} from 'react-redux'
import {sendComment, sendCommentVote} from '../actions/comment'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';
import * as validator from './../utils/validators'

class CommentList extends Component{
  state = {
    newCommentOpen: false,
    author: '',
    comment: '',
    allowComment: false
  }

  componentDidMount() {

  }

  allowComment(){
    if(validator.validateAuthor(this.state.author) === 'success' &&
        validator.validateComment(this.state.comment) === 'success')
      return true
    else
      return false
  }

  submitComment() {
    this.props.sendComment({
      author: this.state.author,
      body: this.state.comment,
      parentId: this.props.parentId,
    })
    this.setState({newCommentOpen: false, author: '', comment: ''})
  }

  render() {
    var commentList = []
    for(var i in this.props.comments){
      let comment = this.props.comments[i]
      commentList.push(
        <div key={comment.id} className='post-comment'>
          {comment.body}<br/>
          by {comment.author}

          <div className='vote-buttons'>
            <Button bsStyle='success' onClick={() => this.props.sendCommentVote({commentid: comment.id, vote: 1})}>
              <img className='thumb-img' src={require('../img/thumb_up.svg')} alt='Down Vote'/>
            </Button>

            &nbsp;{comment.voteScore}&nbsp;

            <Button bsStyle='danger' onClick={() => this.props.sendCommentVote({commentid: comment.id, vote: -1})}>
              <img className='thumb-img' src={require('../img/thumb_down.svg')} alt='Up Vote'/>
            </Button>

          </div>
        </div>
      )
    }
    return (
      <div>
        <div className='post-comments-title'>Comments:</div>
        {commentList}
        <Button bsStyle='primary' onClick={() => this.setState({newCommentOpen: true})}>New Comment</Button>
        <Modal
          className='modal-background'
          overlayClassName='overlay'
          isOpen={this.state.newCommentOpen}
          contentLabel='Modal'
        >
        <form className='childDev'>
          <h3>Add Comment</h3>

          <Col md={6}>
            <FormGroup controlId="formAuthor" validationState={validator.validateAuthor(this.state.author)}>
              <ControlLabel>Author</ControlLabel>
              <FormControl
                inputRef={node => this.inputNode = node}
                type="text"
                placeholder='anon'
                value={this.state.author}
                onChange={(i) => this.setState({author: i.target.value})}
              />
              <FormControl.Feedback />
              <HelpBlock>4 character min</HelpBlock>
            </FormGroup>
          </Col>

          <Col md={12}>
          {validator.validateAuthor(this.state.author) === 'success' && (
              <FormGroup validationState={validator.validateComment(this.state.comment)}>
                <ControlLabel>Comment</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.comment}
                  onChange={(i) => this.setState({comment: i.target.value})}
                />
                <FormControl.Feedback />
                <HelpBlock>10 character min</HelpBlock>
              </FormGroup>
          )}
              <Col md={10}>
                {this.allowComment() && (
                  <Button bsStyle='primary' onClick={() => this.submitComment()}>
                    Submit
                  </Button>
                )}
              </Col>

              <Button bsStyle='default' onClick={() => this.setState({newCommentOpen: false, author: '', comment: ''})}>
                Cancel
              </Button>

          </Col>
        </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
  return{
    comments: comment.filter(c => c.parentId === ownProps.parentId),
  }
}

function mapDispachToProps(dispatch){
  return{
    sendComment: (data) => dispatch(sendComment(data)),
    sendCommentVote: (data) => dispatch(sendCommentVote(data)),
  }
}

export default connect(mapStateToProps, mapDispachToProps)(CommentList);
