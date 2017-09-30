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

  render() {
    return (
      <div>
        {this.props.posts.sort(this.props.sort).map(p =>
          <h4>{p['title']}</h4>
        )}
      </div>
    );
  }
}

export default Post;
