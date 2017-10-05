import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import './../App.css';
import PostList from './PostList'
// import * as API from './../utils/api.js'
import {connect} from 'react-redux'
// import {addPost, addComment, addCategory} from '../actions'


class Home extends Component {
  state = {
    sort_by: 'date',
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        {this.state.sort_by === 'date' && (
          <div>
            Sort by: Date <button onClick={() => this.setState({sort_by: 'score'})}>
              Popularity
            </button>
          </div>
        )}
        {this.state.sort_by === 'score' && (
          <div>
            Sort by: <button onClick={() => this.setState({sort_by: 'date'})}>
              Date
            </button> Popularity
          </div>
        )}
        <PostList sort_by={this.state.sort_by} category={this.props.category}/>
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
  return {
    posts: post,
    comments: comment,
    categories: categories,
    category: ownProps.match.params.category
  }
}

export default connect(mapStateToProps)(Home);
