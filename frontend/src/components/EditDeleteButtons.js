import React, {Component} from 'react'
import {OverlayTrigger, Tooltip, Glyphicon, Button, ButtonGroup, Modal} from 'react-bootstrap'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';
import {sendDeletePost, sendEditPost} from './../actions/post'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom'
import * as validator from './../utils/validators'

class EditDeleteButtons extends Component{
  constructor(props) {
    super(props);

    this.state = {
      editModal: false,
      title: this.props.title,
      title_initial: this.props.title,
      body: this.props.body,
      body_intial: this.props.body,
      deleteModal: false,
      deleteRedirect: false
    }
  }

  deletePost(postid){
    this.props.sendDeletePost({postid})
    this.setState({deleteModal: false, deleteRedirect: true})
  }

  editPost(postid, title, body){
    this.props.sendEditPost({postid, title, body})
    this.setState({editModal: false})
  }

  allowEdit(){
    if(validator.validateTitle(this.state.title) === 'success' &&
      validator.validateBody(this.state.body) === 'success')
      return true
    else
      return false
  }

  render(){
    const editTooltip = (
      <Tooltip placement="bottom" className="in" id='editTooltip'>
        Edit Post
      </Tooltip>
    )
    const deleteTooltip = (
      <Tooltip placement="bottom" className="in" id='deleteTooltip'>
        Delete Post
      </Tooltip>
    )
    return(
      <div className='text-center'>
        {this.state.deleteRedirect && (
          <Redirect to={`/${this.props.match.params.category}`}/>
        )}
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
            <Modal.Title>Delete Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this post?
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='danger' onClick={() => this.deletePost(this.props.match.params.postid)}>Delete</Button>
            <Button onClick={() => this.setState({deleteModal: false})}>Cancel</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.editModal} onHide={() => this.setState({editModal: false, title: this.state.title_initial, body: this.state.body_intial})}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup>
              <ControlLabel>Category</ControlLabel>
              <div>{this.props.category}</div>
            </FormGroup>
            <FormGroup validationState={validator.validateAuthor(this.state.author)}>
              <ControlLabel>Author</ControlLabel>
              <FormControl
                disabled
                type="text"
                placeholder='anon'
                value={this.state.author}
                onChange={(i) => this.setState({author: i.target.value})}
              />
              <FormControl.Feedback />
              <HelpBlock>4 character min</HelpBlock>
            </FormGroup>

            <FormGroup validationState={validator.validateTitle(this.state.title)}>
              <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.title}
                  onChange={(i) => this.setState({title: i.target.value})}
                />
              <FormControl.Feedback />
              <HelpBlock>8 character min</HelpBlock>
            </FormGroup>

            <FormGroup validationState={validator.validateBody(this.state.body)}>
              <ControlLabel>Post</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  value={this.state.body}
                  onChange={(i) => this.setState({body: i.target.value})}
                />
              <FormControl.Feedback />
              <HelpBlock>30 character min</HelpBlock>
            </FormGroup>

          </Modal.Body>
          <Modal.Footer>
            {this.allowEdit() && (
                <Button bsStyle='primary' onClick={() => this.editPost(this.props.id, this.state.title, this.state.body)}>Update</Button>
            )}
            <Button onClick={() => this.setState({editModal: false, title: this.state.title_initial, body: this.state.body_intial})}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
  let p = post.filter(p => p.id === ownProps.match.params.postid)
  if(p.length > 0){
    return {
      title: p[0].title,
      author: p[0].author,
      body: p[0].body,
      voteScore: p[0].voteScore,
      id: p[0].id,
      category: p[0].category
    }
  }
  else {
    return {
      title: 'Post not found',
      author: '',
      body: '',
      voteScore: 0,
      id: '',
    }
  }
}

function mapDispachToProps(dispatch) {
  return{
    sendDeletePost: (data) => dispatch(sendDeletePost(data)),
    sendEditPost: (data) => dispatch(sendEditPost(data)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispachToProps)(EditDeleteButtons));
