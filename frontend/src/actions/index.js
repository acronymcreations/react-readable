export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_POST = 'REMOVE_POST'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export function addPost({author, title, body, category, id}) {
  return {
    type: ADD_POST,
    author,
    title,
    body,
    category,
    id,
    timestamp: Date.now()
  }
}

export function addComment({author, body, id, parentId}) {
  return {
    type: ADD_COMMENT,
    author,
    body,
    id,
    parentId,
    timestamp: Date.now(),
    parentDeleted: false
  }
}
