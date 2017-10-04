import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

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

class PostList extends Component{

  componentDidMount(){
    // console.log('Post component', this.props.posts.length)
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <ul>
        {this.props.posts.map( p => {
          return (
            <li key={p.id}>[{p.voteScore}]&#8195;
              <Link to={{pathname: `/post/${p.id}`}}>
                <strong>{p.title}</strong>
              </Link> by {p.author}
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
    if(ownProps.sort_by === 'date'){
      return {
        posts: post.sort(sortByDate),
        comments: comment,
        categories: categories
      }
    }
    else if(ownProps.sort_by === 'score'){
      return {
        posts: post.sort(sortByScore),
        comments: comment,
        categories: categories
      }
    }
    else{
      return {
        posts: post,
        comments: comment,
        categories: categories
      }
    }
}

export default connect(mapStateToProps)(PostList);
