import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import './../App.css';
import Post from './Post'
import * as API from './../utils/api.js'
import {connect} from 'react-redux'
import {addPost, addComment, addCategory} from '../actions'

function sortByDate (a, b) {
  if(a['timestamp'] === b['timestamp']){
    return 0;
  }else if(a['timestamp'] > b['timestamp']){
    return -1;
  }else{
    return 1;
  }
}

function sortByScore (a, b) {
  if(a['voteScore'] === b['voteScore']){
    return 0;
  }else if(a['voteScore'] > b['voteScore']){
    return -1;
  }else{
    return 1;
  }
}

class App extends Component {
  state = {
    sort_by: 'date',
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
          <h2>Posts</h2>

          {this.state.sort_by === 'date' && (
            <div>
              <a href="#score" onClick={() => this.setState({sort_by: 'score'})}>
                Sort by Popularity
              </a>
              <Post posts={this.props.posts.sort(sortByDate)}/>
            </div>
          )}
          {this.state.sort_by === 'score' && (
            <div>
              <a href="#score" onClick={() => this.setState({sort_by: 'date'})}>
                Sort by Date
              </a>
              <Post posts={this.props.posts.sort(sortByScore)}/>
            </div>
          )}

        </div>
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}){
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
