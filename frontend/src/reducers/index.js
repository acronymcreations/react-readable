import {combineReducers} from 'redux'
import {
  ADD_COMMENT,
  ADD_POST,
  ADD_CATEGORY,
} from '../actions'

function post(state = [], action){
  switch (action.type){
    case ADD_POST:
      const {author, title, body, category, id, timestamp, voteScore, deleted} = action
      let p = {author, title, body, category, id, timestamp, voteScore, deleted}
      var new_array = []
      for(var i in state){
        new_array.push(state[i])
      }
      new_array.push(p)
      return new_array
    default:
      return state
  }
}

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
    default:
      return state
  }
}

function categories(state = [], action){
  switch (action.type){
    case ADD_CATEGORY:
      const {name, path} = action
      let cat = {name, path}
      var new_array = []
      for(var i in state){
        new_array.push(state[i])
      }
      new_array.push(cat)
      return new_array
    default:
      return state
  }
}

// export default post

export default combineReducers({
  post,
  comment,
  categories,
})
