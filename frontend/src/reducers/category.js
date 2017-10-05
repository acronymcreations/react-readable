import {ADD_CATEGORY} from '../actions/category'

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

export default categories;
