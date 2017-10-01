import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import './../App.css';
import Post from './Post'
import * as API from './../utils/api.js'
import {connect} from 'react-redux'
import {addPost, addComment, addCategory} from '../actions'

class App extends Component {
    state = {
      sort_by: 'sortByDate',
    }

  componentDidMount() {
    let p = {
      author: 'thingtwo',
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      category: 'react',
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1506895847426
    }
    this.props.createPost(p)
    this.props.createCategory({name: 'read', path: 'read'})
    // API.getCategories().then( (cat) => {
    //   let list = cat['categories']
    //   for(var i in list){
    //     // console.log(list[i])
    //     this.props.createCategory(list[i])
    //   }
    //
    // })
    // API.getPosts().then( (posts) => {
    //   for(var i in posts){
    //     this.props.createPost(posts[i])
    //     API.getComments(posts[i].id).then( (comments) => {
    //       for(var j in comments){
    //         this.props.createComment(comments[j])
    //       }
    //     })
    //   }
    // })
  }

  render() {
    console.log('props',this.props)
    return (
      <div>
        <div className="App-header">
          <h1>Readable</h1>
        </div>
        <div className='App-body'>
          <h3>Posts</h3>
          {this.props.post}
          <Post posts={this.props.post} sort={this.state.sort_by}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}){
  console.log('map', typeof(post))
  return {
    post: post
  }
}

function mapDispachToProps(dispatch){
  return{
    createPost: (data) => dispatch(addPost(data)),
    createComment: (data) => dispatch(addComment(data)),
    createCategory: (data) => dispatch(addCategory(data)),
  }
}


export default connect(mapStateToProps, mapDispachToProps)(App);
