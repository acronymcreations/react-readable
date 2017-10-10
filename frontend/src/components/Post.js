import React, { Component } from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {sendPostVote} from '../actions/post'
import CommentList from './CommentList'
import EditDeleteButtons from './EditDeleteButtons'
import {Button} from 'react-bootstrap'

class Post extends Component{
  state = {
    newCommentOpen: false
  }

  render() {
    return (
      <div>
        <h2 className="post-title">{this.props.title}</h2>
        <div className='post-author'>By {this.props.author}</div>
        <EditDeleteButtons/>
        <div className='post-body'>
          {this.props.body}
        </div>
        <div className='vote-buttons'>
          <Button bsStyle='success' onClick={() => this.props.sendPostVote({postid: this.props.id, vote: 1})}>
            <img className='thumb-img' src={require('../img/thumb_up.svg')} alt='Up Vote'/>
          </Button>
          &nbsp;{this.props.voteScore}&nbsp;
          <Button bsStyle='danger' onClick={() => this.props.sendPostVote({postid: this.props.id, vote: -1})}>
            <img className='thumb-img' src={require('../img/thumb_down.svg')} alt='Down Vote'/>
          </Button>
        </div>
        <CommentList parentId={this.props.id}/>
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
    sendPostVote: (data) => dispatch(sendPostVote(data)),
  }
}


export default withRouter(connect(mapStateToProps, mapDispachToProps)(Post));
