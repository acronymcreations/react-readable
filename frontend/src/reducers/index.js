import {
  ADD_COMMENT,
  ADD_POST
} from '../actions'

const s = {
  categories: {},
  posts: [],
  comments: []
}

function post(state = s, action){
  switch (action.type){
    case ADD_POST:
      const {author, title, body, category, id, timestamp} = action
      let p = {author, title, body, category, id, timestamp}
      console.log('ss', state['posts'])
      state['posts'].push(p)
      console.log('ss', state)
      return state
    default:
      return state
  }
}

export default post
