import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom'
import './../App.css';
import Post from './Post'

function test () {
  console.log("test worked");
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagories: '',
      sort_by: 'sortByDate',
      posts: []
    }
  }

  getCatagories = () => {
    const url = 'http://localhost:3001/categories';
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        this.setState({catagories:data});
        // console.log(this.state.catagories);
      });
  }

  getPosts = () => {
    const url = 'http://localhost:3001/posts';
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        var p = []
        p = JSON.parse(data)
        this.setState({posts:p});
        console.log(this.state.posts);
      });
  }

  componentDidMount() {
    this.getCatagories();
    this.getPosts();
  }

  render() {
    return (
      <div>
        <div className="App-header">
          <h1>Readable</h1>
        </div>
        <div className='App-body'>
          <h3>Posts</h3>
          <a href="#" onClick={test}>Click me</a>
          <Post posts={this.state.posts} sort={this.state.sort_by}/>
        </div>
      </div>
    );
  }
}

export default App;
