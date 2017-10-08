export function validateAuthor(author) {
  const length = author.length;
  if (length >= 4)
    return 'success';
  else if (length > 0)
    return 'error';
}

export function validateComment(comment) {
  const length = comment.length;
  if (length >= 10)
    return 'success'
  else if (length > 0)
    return 'error'
}

export function validateTitle(title) {
  const length = title.length;
  if (length >= 8)
    return 'success'
  else if (length > 0)
    return 'error'
}

export function validateBody(body) {
  const length = body.length;
  if (length >= 3)
    return 'success'
  else if (length > 0)
    return 'error'
}
