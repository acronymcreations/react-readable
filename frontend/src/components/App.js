import React, { Component } from 'react';
// import {Link, Route} from 'react-router-dom'
import '../bootstrap/css/bootstrap.min.css'
import './../App.css';
import Post from './Post'
import Home from './Home'
import * as API from './../utils/api.js'
import {connect} from 'react-redux'
import {addPost} from '../actions/post'
import {addCategory} from '../actions/category'
import {addComment} from '../actions/comment'
import {Route, withRouter, Link} from 'react-router-dom'

class App extends Component {

  componentDidMount() {
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
    if(this.props.categories.length === 0){
      console.log('called API')
      API.getCategories().then( (cat) => {
        let list = cat['categories']
        for(var i in list){
          this.props.createCategory(list[i])
        }
      })
    }
  }

  render() {
    // console.log(this.props)
    var categoriesList = []
    categoriesList.push(
      <span key='all'>
        <Link to={{pathname: '/'}}>
          all
        </Link>&#8195;
      </span>
    )
    categoriesList.push(
      this.props.categories.map(c => {
        return(
          <span key={c.path}>
          <Link to={{pathname: `/${c.path}`}}>
            {c.name}
          </Link>&#8195;
          </span>
        )
      })
    )
    categoriesList.push(
      <span key='new'>
        <Link to={{pathname: '/'}}>
          +
        </Link>&#8195;
      </span>
    )
    return (
      <div>
        <div className="App-header">
          <h1>Readable</h1>
          <h3>{categoriesList}</h3>
        </div>
        <div className='App-body'>
          <Route exact path='/' component={Home}/>
          <Route exact path='/:category/:postid' component={Post}/>
          <Route exact path='/:category' component={Home}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps({post, comment, categories}, ownProps){
  // console.log('ownProps app', ownProps)
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


export default withRouter(connect(mapStateToProps, mapDispachToProps)(App));
