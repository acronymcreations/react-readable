import {ADD_COMMENT, VOTE_COMMENT} from '../actions/comment'

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

    default:
      return state
  }
}

export default comment;
