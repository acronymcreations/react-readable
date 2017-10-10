import React, {Component} from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';
import {connect} from 'react-redux'
import {sendPost} from '../actions/post'
import Modal from 'react-modal'
import * as validator from './../utils/validators'

class NewPostModal extends Component{
  state = {
    newPostOpen: false,
    author: '',
    title: '',
    body: '',
    category: this.props.category
  }

  submitPost(){
    this.props.sendPost({
      author: this.state.author,
      title: this.state.title,
      body: this.state.body,
      category: this.state.category
    })
    this.setState(
      {
        newPostOpen: false,
        author: '',
        title: '',
        body: '',
      }
    )
  }

  allowPost(){
    if(this.state.category &&
        validator.validateAuthor(this.state.author) === 'success' &&
        validator.validateTitle(this.state.title) === 'success' &&
        validator.validateBody(this.state.body) === 'success')
      return true
    else
      return false
  }

  render(){
    var categoriesList = []
    categoriesList.push(
      this.props.categories.map(c => {
        return(
          <option value={c}>{c}</option>
        )
      })
    )
    return(
      <div>
        <Button bsStyle='primary' onClick={() => this.setState({newPostOpen: true})}>
          New Post
        </Button>
        <Modal
          className='modal-background'
          overlayClassName='overlay'
          isOpen={this.state.newPostOpen}
          contentLabel='Modal'
        >
        <form className='childDev'>
          <h3>Add Post</h3>

          <Col md={12}>
            <FormGroup controlId='selectCategory'>
              <ControlLabel>Category</ControlLabel>
              {this.props.category === undefined && (
                <FormControl componentClass="select" defaultValue='other' onChange={(i) => this.setState({category: document.getElementById('selectCategory').value})}>
                  <option disabled value='other'>Select One...</option>
                  {categoriesList}
                </FormControl>
              )}
              {this.props.category !== undefined && (
                <div>{this.props.category}</div>
              )}
            </FormGroup>
          </Col>

          {this.state.category && (
            <Col md={12}>
              <FormGroup validationState={validator.validateAuthor(this.state.author)}>
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
          )}

          {validator.validateAuthor(this.state.author) === 'success' && (
            <Col md={12}>
              <FormGroup validationState={validator.validateTitle(this.state.title)}>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  inputRef={node => this.inputNode = node}
                  type="text"
                  value={this.state.title}
                  onChange={(i) => this.setState({title: i.target.value})}
                />
                <FormControl.Feedback />
                <HelpBlock>8 character min</HelpBlock>
              </FormGroup>
            </Col>
          )}

          <Col md={12}>
            {validator.validateTitle(this.state.title) === 'success' && (
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
            )}
            <Col md={10}>
              {this.allowPost() && (
                  <Button bsStyle='primary' onClick={() => this.submitPost()}>
                    Submit
                  </Button>
              )}
            </Col>
            <Button bsStyle='default' onClick={() => this.setState({newPostOpen: false, author: '', title: '', body: '',})}>
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
  return({
    categories: categories.map((i) => i.name)
  })
}

function mapDispachToProps(dispatch){
  return{
    sendPost: (data) => dispatch(sendPost(data)),
  }
}

export default connect(mapStateToProps, mapDispachToProps)(NewPostModal);
