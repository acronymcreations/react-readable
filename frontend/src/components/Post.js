import React, { Component } from 'react';

class Post extends Component{

  sortByDate = (a, b) => {
    if(a['timestamp'] === b['timestamp']){
      return 0;
    }else if(a['timestamp'] > b['timestamp']){
      return -1;
    }else{
      return 1;
    }
  }
  // {this.props.posts.sort(this.props.sort).map(p =>
  //   <h4>{p['title']}</h4>
  // )}
  // {this.props.posts.map(p => p.title)}

  componentDidMount(){
    console.log('Post component', this.props.posts.length)
  }

  render() {
    return (
      <div>
        hello
        {this.props.posts.map(p => p.title)}
      </div>
    );
  }
}

export default Post;
