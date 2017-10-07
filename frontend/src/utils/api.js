const URL = 'http://localhost:3001/'
const headers = { 'Authorization': 'whatever-you-want' }

export const getCategories = () => {
  const u = `${URL}categories`
  return fetch(u, { headers: headers} )
    .then( res => res.text())
    .then( data => JSON.parse(data))
}

export const getPosts = () => {
  const u = `${URL}posts`
  return fetch(u, { headers: headers} )
    .then( res => res.text() )
    .then((data) => JSON.parse(data))
}

export const getComments = (id) => {
  const u = `${URL}posts/${id}/comments`
  return fetch(u, { headers: headers} )
    .then( res => res.text() )
    .then((data) => JSON.parse(data))
}

export const generateID = () => {
  var uniqueId = Math.random().toString(36).substring(2)
                 + (new Date()).getTime().toString(36);
  return uniqueId
}
