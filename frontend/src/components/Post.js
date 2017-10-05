import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {votePost} from '../actions/post'

class Post extends Component{

  render() {
    var c = []
    for(var i in this.props.comments){
      let comment = this.props.comments[i]
      c.push(
        <div key={comment.id} className='post-comment'>
          {comment.body}<br/>
          by {comment.author}
          <div className='vote-buttons'>
            <button onClick={() => this.props.votePost({postid: this.props.id, vote: 1})}>
              <img src={require('../img/thumb_up.svg')} width='12' alt='Down Vote'/>
            </button>
            &#8195;{comment.voteScore}&#8195;
            <button onClick={() => this.props.votePost({postid: this.props.id, vote: -1})}>
              <img src={require('../img/thumb_down.svg')} width='12' alt='Up Vote'/>
            </button>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="post-title">{this.props.title}</div>
        <div className='post-author'>By {this.props.author}</div>
        <div className='post-body'>
          {this.props.body}
        </div>
        <div className='vote-buttons'>
          <button onClick={() => this.props.votePost({postid: this.props.id, vote: 1})}>
            <img src={require('../img/thumb_up.svg')} width='12' alt='Down Vote'/>
          </button>
          &#8195;{this.props.voteScore}&#8195;
          <button onClick={() => this.props.votePost({postid: this.props.id, vote: -1})}>
            <img src={require('../img/thumb_down.svg')} width='12' alt='Up Vote'/>
          </button>
        </div>
        <div className='post-comments-title'>Comments:</div>
        {c}
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
      body: p[0].body,
      voteScore: p[0].voteScore,
      id: p[0].id,
      comments: comment.filter(c => c.parentId === p[0].id)
    }
  }
  else {
    return {
      title: 'Post not found'
    }
  }
}

function mapDispachToProps(dispatch){
  return{
    votePost: (data) => dispatch(votePost(data))
  }
}


export default withRouter(connect(mapStateToProps, mapDispachToProps)(Post));
