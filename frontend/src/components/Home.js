import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import './../App.css';
import PostList from './PostList'
// import * as API from './../utils/api.js'
import {connect} from 'react-redux'
// import {addPost, addComment, addCategory} from '../actions'

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

class Home extends Component {
  state = {
    sort_by: 'date',
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <h2>Posts</h2>
        {this.state.sort_by === 'date' && (
          <div>
            Sort by: Date <a href="#score" onClick={() => this.setState({sort_by: 'score'})}>
              Popularity
            </a>
            <PostList posts={this.props.posts.sort(sortByDate)}/>
          </div>
        )}
        {this.state.sort_by === 'score' && (
          <div>
            Sort by: <a href="#date" onClick={() => this.setState({sort_by: 'date'})}>
              Date
            </a> Popularity
            <PostList posts={this.props.posts.sort(sortByScore)}/>
          </div>
        )}
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

export default connect(mapStateToProps)(Home);
