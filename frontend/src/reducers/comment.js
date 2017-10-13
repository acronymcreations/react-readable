import {ADD_COMMENT, VOTE_COMMENT, EDIT_COMMENT, DELETE_COMMENT} from '../actions/comment'

function comment(state = [], action){
  switch (action.type){
    case ADD_COMMENT:
      const {author, body, deleted, id, parentDeleted, parentId, timestamp, voteScore} = action
      let c = {author, body, deleted, id, parentDeleted, parentId, timestamp, voteScore}
      var new_array = []
      for(var i in state){
        new_array.push(state[i])
      }
      new_array.push(c)
      return new_array

    case VOTE_COMMENT:
      const {commentid, vote} = action
      var score_array = []
      score_array = state.map(c => {
        if(c.id === commentid){
          c.voteScore += vote
        }
        return c
      })
      return score_array

    case DELETE_COMMENT:
      const delete_id = action.commentid
      var delete_array = []
      delete_array = state.filter(c => c.id !== delete_id)
      return delete_array

    case EDIT_COMMENT:
      const edit_id = action.commentid
      const edit_body = action.body
      const edit_timestamp = action.timestamp
      var edit_array = []
      edit_array = state.map(c => {
        if(c.id === edit_id){
          c.body = edit_body
          c.timestamp = edit_timestamp
        }
        return c
      })
      return edit_array

    default:
      return state
  }
}

export default comment;
