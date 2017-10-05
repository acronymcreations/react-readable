export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'

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

export function votePost({postid, vote}){
  return{
    type: VOTE_POST,
    postid,
    vote
  }
}
