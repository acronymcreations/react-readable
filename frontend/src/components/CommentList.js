import React, {Component} from 'react'
import Modal from 'react-modal'
// import Loading from 'react-loading'
import {connect} from 'react-redux'
import {votePost} from '../actions/post'
import {voteComment} from '../actions/comment'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';

class CommentList extends Component{
  state = {
    newCommentOpen: true,
    author: '',
    comment: '',
    allowComment: false
  }

  componentDidMount() {
    console.log(this.inputNode)
    // this.inputNode.value;
  }

  validateAuthor() {
    const length = this.state.author.length;
    if (length >= 4)
      return 'success';
    else if (length > 3)
      return 'warning';
    else if (length > 0)
      return 'error';
  }

  validateComment() {
    const length = this.state.comment.length;
    if (length >= 10)
      return 'success'
    else if(length >= 5)
      return 'warning'
    else if (length > 0)
      return 'error'
  }

  allowComment(){
    if(this.validateAuthor() === 'success' && this.validateComment() === 'success')
      return false
    else
      return true
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
            <Button bsStyle='success' onClick={() => this.props.voteComment({commentid: comment.id, vote: 1})}>
              <img className='thumb-img' src={require('../img/thumb_up.svg')} alt='Down Vote'/>
            </Button>

            &nbsp;{comment.voteScore}&nbsp;

            <Button bsStyle='danger' onClick={() => this.props.voteComment({commentid: comment.id, vote: -1})}>
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
            <FormGroup controlId="formAuthor" validationState={this.validateAuthor()}>
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

            <FormGroup validationState={this.validateComment()}>
              <ControlLabel>Comment</ControlLabel>
              <FormControl
                componentClass="textarea"
                value={this.state.comment}
                onChange={(i) => this.setState({comment: i.target.value})}
              />
              <FormControl.Feedback />
              <HelpBlock>10 character min</HelpBlock>
            </FormGroup>

            <Col md={10}>
              <Button disabled={this.allowComment()} bsStyle='primary' type="submit">
                Submit
              </Button>
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
    votePost: (data) => dispatch(votePost(data)),
    voteComment: (data) => dispatch(voteComment(data)),
  }
}

export default connect(mapStateToProps, mapDispachToProps)(CommentList);
