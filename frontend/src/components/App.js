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

  sortByDate = (a, b) => {
    console.log('sorting')
    if(a['timestamp'] === b['timestamp']){
      return 0;
    }else if(a['timestamp'] > b['timestamp']){
      return -1;
    }else{
      return 1;
    }
  }

  componentDidMount() {
    if(this.props.categories.length === 0){
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
          <h3>Posts</h3>
          <Post posts={this.props.posts.sort(this.state.sort_by)} sort={this.state.sort_by}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}){
  for(var i in post){
    post[i]['key'] = post[i].id
  }
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


export default connect(mapStateToProps, mapDispachToProps)(App);
