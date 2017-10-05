import {ADD_POST, VOTE_POST} from '../actions/post'

function post(state = [], action){
  switch (action.type){
    case ADD_POST:
      const {author, title, body, category, id, timestamp, voteScore, deleted, commentCount} = action
      let p = {author, title, body, category, id, timestamp, voteScore, deleted, commentCount}
      var new_array = []
      for(var i in state){
        new_array.push(state[i])
      }
      new_array.push(p)
      return new_array
    case VOTE_POST:
      const {postid, vote} = action
      var score_array = []
      score_array = state.map(p => {
        if(p.id === postid)
          p.voteScore += vote
        return p
      })
      return score_array
    default:
      return state
  }
}

export default post;
