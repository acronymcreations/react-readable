import {ADD_POST, VOTE_POST, DELETE_POST, EDIT_POST} from '../actions/post'

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

    case DELETE_POST:
      const delete_postid = action.postid
      var delete_array = []
      delete_array = state.filter(p => p.id !== delete_postid)
      return delete_array

    case EDIT_POST:
      const edit_postid = action.postid
      const edit_body = action.body
      const edit_title = action.title
      var edit_array = []
      edit_array = state.map(p => {
        if(p.id === edit_postid){
          p.body = edit_body
          p.title = edit_title
        }
        return p
      })
      return edit_array

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
