import * as API from './../utils/api'
export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'

export function addPost({author, title, body, category, id, timestamp, voteScore, deleted}) {
  return {
    type: ADD_POST,
    author,
    title,
    body,
    category,
    id,
    timestamp,
    voteScore,
    deleted
  }
}

export function deletePost({postid}){
  return {
    type: DELETE_POST,
    postid
  }
}

export function sendDeletePost({postid}){
  return function(dispatch){
    return API.deletePost(postid).then(
      (data) => dispatch(deletePost({postid}))
    )
  }
}

export function editPost({postid, title, body}){
  return {
    type: EDIT_POST,
    postid,
    title,
    body
  }
}

export function sendEditPost({postid, title, body}){
  return function(dispatch){
    return API.editPost(postid, title, body).then(
      (data) => dispatch(editPost({postid, title, body}))
    )
  }
}

export function sendPost({author, title, body, category}){
  let timestamp = Date.now()
  return function(dispatch){
    return API.addPost(author, title, body, category, timestamp).then(
      (id) => dispatch(addPost({author, title, body, category, id, timestamp, voteScore: 1, deleted: false}))
    )
  }
}

export function votePost({postid, vote}){
  return{
    type: VOTE_POST,
    postid,
    vote
  }
}

export function sendPostVote({postid, vote}){
  return function(dispatch){
    return API.postVote(postid, vote).then(
      (data) => dispatch(votePost({postid, vote}))
    )
  }
}
