import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import './../App.css';
import Post from './Post'
import Home from './Home'
import * as API from './../utils/api.js'
import {connect} from 'react-redux'
import {addPost, addComment, addCategory} from '../actions'
import {Route, withRouter} from 'react-router-dom'

class App extends Component {

  componentDidMount() {
    if(this.props.categories.length === 0){
      console.log('called API')
      API.getCategories().then( (cat) => {
        let list = cat['categories']
        for(var i in list){
          this.props.createCategory(list[i])
        }
      })
    }
    if(this.props.posts.length === 0){
      API.getPosts().then( (posts) => {
        for(var i in posts){
          this.props.createPost(posts[i])
          API.getComments(posts[i].id).then( (comments) => {
            for(var j in comments){
              this.props.createComment(comments[j])
            }
          })
        }
      })
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <div className="App-header">
          <h1>Readable</h1>
        </div>
        <div className='App-body'>
          <Route exact path='/' render={() => (
            <Home posts={this.props.posts}/>
          )}/>
          <Route path='/post/:postid' component={Post}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
  // console.log('ownProps app', ownProps)
  return {
    posts: post,
    comments: comment,
    categories: categories
  }
}

function mapDispachToProps(dispatch){
  return{
    createPost: (data) => dispatch(addPost(data)),
    createComment: (data) => dispatch(addComment(data)),
    createCategory: (data) => dispatch(addCategory(data)),
  }
}


export default withRouter(connect(mapStateToProps, mapDispachToProps)(App));
