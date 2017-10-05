export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function voteComment({commentid, vote}){
  return{
    type: VOTE_COMMENT,
    commentid,
    vote
  }
}

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
