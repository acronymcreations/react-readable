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

export const addComment = (author, body, id, parentId, timestamp) => {
  const u = `${URL}comments`
  return fetch(u, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({author, body, id, parentId, timestamp})
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
