import React, { Component } from 'react';
import {Link} from 'react-router-dom'

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
            <li key={p.id}>
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

// <Link to="ideas" params={{ testvalue: "hello" }}>Create Idea</Link>

export default PostList;
