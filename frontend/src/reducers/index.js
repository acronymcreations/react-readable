import {combineReducers} from 'redux'
import {
  ADD_COMMENT,
  ADD_POST,
  ADD_CATEGORY,
} from '../actions'

function post(state = [], action){
  switch (action.type){
    case ADD_POST:
      const {author, title, body, category, id, timestamp} = action
      let p = {author, title, body, category, id, timestamp}
      state.push(p)
      return state
    default:
      return state
  }
}

// function post(state = {post: []}, action){
//   switch (action.type){
//     case ADD_POST:
//       const {author, title, body, category, id, timestamp} = action
//       let p = {author, title, body, category, id, timestamp}
//       state.post.push(p)
//       return state
//     default:
//       return state
//   }
// }

function comment(state = [], action){
  switch (action.type){
    case ADD_COMMENT:
      const {author, body, id, parentId, timestamp, parentDeleted} = action
      let c = {author, body, id, parentId, timestamp, parentDeleted}
      state.push(c)
      return state
    default:
      return state
  }
}

function categories(state = [], action){
  switch (action.type){
    case ADD_CATEGORY:
      const {name, path} = action
      let cat = {name, path}
      state.push(cat)
      return state
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
