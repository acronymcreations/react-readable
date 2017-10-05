import {combineReducers} from 'redux'
import post from './post'
import comment from './comment'
import categories from './category'

export default combineReducers({
  post,
  comment,
  categories,
})
