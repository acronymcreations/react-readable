import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import './../App.css';
import Post from './Post'
import * as API from './../utils/api.js'
import {connect} from 'react-redux'
import {addPost} from '../actions'

function test () {
  console.log("test worked");
}

let a = {}

class App extends Component {
    state = {
      categories: {},
      sort_by: 'sortByDate',
      posts: [],
      comments: []
    }



  componentDidMount() {
    // API.getCategories().then( (data) => {
    //     // console.log(data);
    //     a = data
    //   })
    // API.getPosts().then( (data) => {
    //     // console.log(data);
    //     a.posts = data
    //   })
    // API.getComments('8xf0y6ziyjabvozdd253nd').then( data => {
    //   // console.log(data)
    //   a.comments = data
    //   // console.log(a)
    // })
    let title = 'title'
    let author = 'author'
    let body = 'body'
    let category = 'category'
    let id = 'fskjghsk'
    this.props.createPost({author, title, body, category, id})
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className="App-header">
          <h1>Readable</h1>
        </div>
        <div className='App-body'>
          <h3>Posts</h3>
          <a onClick={test}>Click me</a>
          <Post posts={this.state.posts} sort={this.state.sort_by}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(data){
  // console.log('map', Object.keys(data.categories))
  return {
    posts: data.posts,
    categories: data.categories,
    comments: data.comments,
  }
}

function mapDispachToProps(dispatch){
  return{
    createPost: (data) => dispatch(addPost(data))
  }
}


export default connect(mapStateToProps, mapDispachToProps)(App);
