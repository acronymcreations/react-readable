export const ADD_CATEGORY = 'ADD_CATEGORY'

export function addCategory({name, path}) {
  return{
    type: ADD_CATEGORY,
    name,
    path,
  }
}
