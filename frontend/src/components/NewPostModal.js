import React, {Component} from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';
import Modal from 'react-modal'
import * as validator from './../utils/validators'

class NewPostModal extends Component{
  state = {
    newPostOpen: false,
    author: '',
    title: '',
    body: '',
    allowPost: false
  }

  submitPost(){
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
    if(validator.validateAuthor(this.state.author) === 'success' &&
        validator.validateTitle(this.state.title) === 'success' &&
        validator.validateBody(this.state.body) === 'success')
      return false
    else
      return true
  }

  render(){
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
            <FormGroup controlId="formAuthor" validationState={validator.validateTitle(this.state.title)}>
              <ControlLabel>Title</ControlLabel>
              <FormControl
                inputRef={node => this.inputNode = node}
                type="text"
                placeholder='anon'
                value={this.state.title}
                onChange={(i) => this.setState({title: i.target.value})}
              />
              <FormControl.Feedback />
              <HelpBlock>8 character min</HelpBlock>
            </FormGroup>
          </Col>

          <Col md={12}>

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
            {this.props.category === undefined && (
              <FormGroup>
                <ControlLabel>Category</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option disabled selected value="other">Select One</option>
                  <option value="select">Udacity</option>
                  <option value="other">React</option>
                  <option value="other">Redux</option>
                </FormControl>
              </FormGroup>
            )}
            <Col md={10}>
              <Button disabled={this.allowPost()} bsStyle='primary' onClick={() => this.submitPost()}>
                Submit
              </Button>
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

export default NewPostModal;
