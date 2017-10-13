import * as API from './../utils/api'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'



export function addComment({author, body, deleted, id, parentDeleted, parentId, timestamp, voteScore}) {
  return {
    type: ADD_COMMENT,
    author,
    body,
    deleted,
    id,
    parentDeleted,
    parentId,
    timestamp,
    voteScore
  }
}

export function sendComment({author, body, parentId}){
  let timestamp = Date.now()
  return function(dispatch){
    return API.addComment(author, body, parentId, timestamp).then(
      (id) => dispatch(addComment({author, body, deleted: false, id, parentDeleted: false, parentId, timestamp, voteScore: 1}))
    )
  }
}

export function deleteComment({commentid}){
  return{
    type: DELETE_COMMENT,
    commentid
  }
}

export function sendDeleteComment({commentid}){
  return function(dispatch){
    return API.deleteComment(commentid).then(
      (data) => dispatch(deleteComment({commentid}))
    )
  }
}

export function editComment({commentid, body, timestamp}){
  return {
    type: EDIT_COMMENT,
    commentid,
    body,
    timestamp
  }
}

export function sendEditComment({commentid, body}){
  let timestamp = Date.now()
  return function(dispatch){
    return API.editComment(commentid, body, timestamp).then(
      (data) => dispatch(editComment({commentid, body, timestamp}))
    )
  }
}

export function voteComment({commentid, vote}){
  return{
    type: VOTE_COMMENT,
    commentid,
    vote
  }
}

export function sendCommentVote({commentid, vote}){
  return function(dispatch){
    return API.commentVote(commentid, vote).then(
      (data) => dispatch(voteComment({commentid, vote}))
    )
  }
}
