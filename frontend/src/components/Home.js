import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import PostList from './PostList'
import NewPostModal from './NewPostModal'
// import * as API from './../utils/api.js'
import {connect} from 'react-redux'
// import Loading from 'react-loading'
// import {addPost, addComment, addCategory} from '../actions'
import { Button } from 'react-bootstrap';


class Home extends Component {
  state = {
    sort_by: 'date',
    newPostOpen: 'true',
    author: '',
    title: '',
    body: '',
    allowPost: false
  }

  render() {
    return (
      <div>
        <h2>Posts</h2>
        {this.state.sort_by === 'date' && (
          <div>
            <h5>
              Sort by: Date&nbsp;
              <Button bsStyle='default' onClick={() => this.setState({sort_by: 'score'})}>
                Popularity
              </Button>
            </h5>
          </div>
        )}
        {this.state.sort_by === 'score' && (
          <div>
            <h5>
              Sort by:&nbsp;
              <Button bsStyle='default' onClick={() => this.setState({sort_by: 'date'})}>
                Date
              </Button> Popularity
            </h5>
          </div>
        )}
        <PostList sort_by={this.state.sort_by} category={this.props.category}/>
        <NewPostModal category={this.props.category}/>
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
