import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class Post extends Component{

  render() {
    // console.log(this.state)
    // console.log("Post page", this.props)
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h4>By {this.props.author}</h4>
        {this.props.body}
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
  let p = post.filter(p => p.id === ownProps.match.params.postid)
  if(p.length > 0){
    return {
      title: p[0].title,
      author: p[0].author,
      body: p[0].body
    }
  }
  else {
    return {
      title: 'Post not found'
    }
  }
}


export default withRouter(connect(mapStateToProps)(Post));
