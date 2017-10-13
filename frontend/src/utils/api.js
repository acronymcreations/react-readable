const URL = 'http://localhost:3001/'
const headers = { 'Authorization': 'whatever-you-want', 'Content-Type': 'application/json' }

export const generateID = () => {
  var uniqueId = Math.random().toString(36).substring(2)
                 + (new Date()).getTime().toString(36);
  return uniqueId
}

export const getPosts = () => {
  const u = `${URL}posts`
  return fetch(u, { headers: headers} )
    .then( res => res.text() )
    .then((data) => JSON.parse(data))
}

export const addPost = (author, title, body, category, timestamp) => {
  const u = `${URL}posts`
  let id = generateID()
  return fetch(u, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({author, body, title, id, category, timestamp})
  }).then(data => id)
}

export const deletePost = (postid) => {
  const u = `${URL}posts/${postid}`
  return fetch(u, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({postid})
  }).then(data => data)
}

export const editPost = (postid, title, body) => {
  const u = `${URL}posts/${postid}`
  return fetch(u, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({title, body})
  }).then(data => data)
}

export const postVote = (postid, vote) => {
  const u = `${URL}posts/${postid}`
  let option = vote === 1 ? 'upVote' : 'downVote'
  return fetch(u, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({option: option})
  }).then(data => data)
}

export const getComments = (id) => {
  const u = `${URL}posts/${id}/comments`
  return fetch(u, { headers: headers} )
    .then( res => res.text() )
    .then((data) => JSON.parse(data))
}

export const addComment = (author, body, parentId, timestamp) => {
  const u = `${URL}comments`
  let id = generateID()
  return fetch(u, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({author, body, id, parentId, timestamp})
  }).then(data => id)
}

export const editComment = (commentid, body, timestamp) => {
  const u = `${URL}comments/${commentid}`
  console.log(u)
  return fetch(u, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({timestamp, body})
  }).then(data => data)
}

export const deleteComment = (commentid) => {
  const u = `${URL}comments/${commentid}`
  return fetch(u, {
    method: 'DELETE',
    headers: headers,
  }).then(data => data)
}

export const commentVote = (commentid, vote) => {
  const u = `${URL}comments/${commentid}`
  let option = vote === 1 ? 'upVote' : 'downVote'
  return fetch(u, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({option: option})
  }).then(data => data)
}

export const getCategories = () => {
  const u = `${URL}categories`
  return fetch(u, { headers: headers} )
    .then( res => res.text())
    .then( data => JSON.parse(data))
}
