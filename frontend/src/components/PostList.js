import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {sendPostVote} from '../actions/post'
import { Button } from 'react-bootstrap';

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

  }

  getCommentCount(postid) {
    let comments = this.props.comments.filter(c => c.parentId === postid)
    return comments.length
  }

  votePost(postid, vote) {
    this.props.sendPostVote({postid, vote})
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <ul>
        {this.props.posts.map( p => {
          return (
            <li key={p.id}>

              <Button bsStyle='success' onClick={() => this.props.sendPostVote({postid: p.id, vote: 1})}>
                <img className='thumb-img' src={require('../img/thumb_up.svg')} alt='Up Vote'/>
              </Button>

              &nbsp;{p.voteScore}&nbsp;

              <Button bsStyle='danger' onClick={() => this.props.sendPostVote({postid: p.id, vote: -1})}>
                <img className='thumb-img' src={require('../img/thumb_down.svg')} alt='Down Vote'/>
              </Button>
              &nbsp;
              <Link to={{pathname: `/${p.category}/${p.id}`}}>
                <strong>{p.title}</strong>
              </Link> by {p.author}&#8195;

              ({this.getCommentCount(p.id)}
              <img src={require('../img/chat-bubble.png')} alt='' width='15'/>)
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
  var sortedPosts = []
    if(ownProps.category)
      post = post.filter((p) => p.category === ownProps.category)
    if(ownProps.sort_by === 'date')
      sortedPosts = post.sort(sortByDate)
    else if(ownProps.sort_by === 'score')
      sortedPosts = post.sort(sortByScore)
    else
      sortedPosts = post
    return {
      posts: sortedPosts,
      comments: comment,
      categories: categories
    }

}

function mapDispachToProps(dispatch){
  return{
    sendPostVote: (data) => dispatch(sendPostVote(data))
  }
}

export default connect(mapStateToProps, mapDispachToProps)(PostList);
