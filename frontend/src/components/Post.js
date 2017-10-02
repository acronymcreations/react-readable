import React, { Component } from 'react';

class Post extends Component{

  componentDidMount(){
    // console.log('Post component', this.props.posts.length)
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <ul>
        {this.props.posts.map( p => {
          return (
            <li key={p.id}>
              <strong>{p.title}</strong> by {p.author}
            </li>
          )
        })}
        </ul>
      </div>
    );
  }
}

export default Post;
