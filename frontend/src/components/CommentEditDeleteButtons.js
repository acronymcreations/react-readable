import React, {Component} from 'react'
import {connect} from 'react-redux'
import {OverlayTrigger, Tooltip, Glyphicon, Button, ButtonGroup, Modal} from 'react-bootstrap'
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import {sendDeleteComment, sendEditComment} from './../actions/comment'
import * as validator from './../utils/validators'

class CommentEditDeleteButtons extends Component{
  constructor(props) {
    super(props);

    this.state = {
      editModal: false,
      body: this.props.body,
      body_intial: this.props.body,
      deleteModal: false,
    }
  }

  deleteComment(commentid){
    this.setState({deleteModal: false})
    this.props.sendDeleteComment({commentid})
  }

  allowEdit(){
    if(validator.validateComment(this.state.body) === 'success')
      return true
    else
      return false
  }

  editComment(commentid, body){
    this.setState({editModal: false, body: this.state.body_intial})
    this.props.sendEditComment({commentid, body})
  }

  render(){
    const editTooltip = (
      <Tooltip placement="bottom" className="in" id='editTooltip'>
        Edit Comment
      </Tooltip>
    )
    const deleteTooltip = (
      <Tooltip placement="bottom" className="in" id='deleteTooltip'>
        Delete Comment
      </Tooltip>
    )
    return(
      <div>
        <ButtonGroup>
          <OverlayTrigger placement="bottom" overlay={editTooltip}>
            <Button onClick={() => this.setState({editModal: true})}>
              <Glyphicon glyph="pencil" />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger placement="bottom" overlay={deleteTooltip}>
            <Button onClick={() => this.setState({deleteModal: true})}>
              <Glyphicon glyph='remove'/>
            </Button>
          </OverlayTrigger>
        </ButtonGroup>

        <Modal show={this.state.deleteModal} onHide={() => this.setState({deleteModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this comment?
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='danger' onClick={() => this.deleteComment(this.props.commentid)}>Delete</Button>
            <Button onClick={() => this.setState({deleteModal: false})}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.editModal} onHide={() => this.setState({editModal: false, body: this.state.body_intial})}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Author</ControlLabel>
              <FormControl
                disabled
                type="text"
                value={this.props.author}
                onChange={(i) => this.setState({author: i.target.value})}
              />
              <FormControl.Feedback />
              <HelpBlock>4 character min</HelpBlock>
            </FormGroup>

            <FormGroup validationState={validator.validateComment(this.state.body)}>
              <ControlLabel>Post</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.body}
                  onChange={(i) => this.setState({body: i.target.value})}
                />
              <FormControl.Feedback />
              <HelpBlock>10 character min</HelpBlock>
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            {this.allowEdit() && (
                <Button bsStyle='primary' onClick={() => this.editComment(this.props.commentid, this.state.body)}>Update</Button>
            )}
            <Button onClick={() => this.setState({editModal: false, title: this.state.title_initial, body: this.state.body_intial})}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
  let c = comment.filter(c => c.id === ownProps.commentid)
  if(c.length > 0){
    return {
      author: c[0].author,
      body: c[0].body,
      id: c[0].id,
    }
  }
  else {
    return {
      author: '',
      body: '',
      id: '',
    }
  }
}

function mapDispachToProps(dispatch){
  return{
    sendDeleteComment: (data) => dispatch(sendDeleteComment(data)),
    sendEditComment: (data) => dispatch(sendEditComment(data)),
  }
}

export default connect(mapStateToProps, mapDispachToProps)(CommentEditDeleteButtons);
