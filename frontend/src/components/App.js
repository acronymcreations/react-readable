import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import './../App.css';
import Post from './Post'
import * as API from './../utils/api.js'
import {connect} from 'react-redux'
import {addPost, addComment, addCategory} from '../actions'

function test () {
  console.log("test worked");
}

class App extends Component {
    state = {
      categories: [],
      sort_by: 'sortByDate',
      posts: [],
      comments: []
    }

  componentDidMount() {
    API.getCategories().then( (cat) => {
      let list = cat['categories']
      for(var i in list){
        this.props.createCategory(list[i])
      }

    })
    API.getPosts().then( (posts) => {
      for(var i in posts){
        this.props.createPost(posts[i])
        API.getComments(posts[i].id).then( (comments) => {
          console.log(comments);
          for(var j in comments){
            this.props.createComment(comments[j])
          }
        })
      }
    })
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
          <Post posts={this.props.posts} sort={this.state.sort_by}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(data){
  console.log('map', data)
  return {
    posts: data.post,
    categories: data.categories,
    comments: data.comment,
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
