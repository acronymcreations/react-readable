import React, {Component} from 'react'
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, Col } from 'react-bootstrap';
import {connect} from 'react-redux'
import Modal from 'react-modal'
import * as validator from './../utils/validators'
import * as API from './../utils/api'

class NewPostModal extends Component{
  state = {
    newPostOpen: false,
    author: '',
    title: '',
    body: '',
    allowPost: false,
    category: ''
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
    if(this.state.category &&
        validator.validateAuthor(this.state.author) === 'success' &&
        validator.validateTitle(this.state.title) === 'success' &&
        validator.validateBody(this.state.body) === 'success')
      return false
    else
      return true
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
                <FormControl componentClass="select" placeholder="select" onChange={(i) => this.setState({category: i})}>
                  <option selected disabled value='other'>Select One...</option>
                  {categoriesList}
                </FormControl>
              )}
              {this.props.category !== undefined && (
                <div>{this.props.category}</div>
              )}
            </FormGroup>
          </Col>

          <Col md={12}>
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

function mapStateToProps({post, comment, categories}, ownProps){
  return({
    categories: categories.map((i) => i.name)
  })
}

function mapDispachToProps(){

}

export default connect(mapStateToProps, mapDispachToProps)(NewPostModal);
