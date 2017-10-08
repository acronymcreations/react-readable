import * as API from './../utils/api'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
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
