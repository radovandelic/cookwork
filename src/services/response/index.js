export const success = (res, status) => (entity) => {
  if (entity) {
    res.status(status || 200).json(entity)
  }
  return null
}

export const notFound = (res) => (entity) => {
  if (entity && entity.length !== 0) {
    return entity
  }
  res.status(404).end()
  return null
}

export const authorOrAdmin = (res, user, role) => (entity) => {
  if (entity) {
    if (entity instanceof Array) entity = entity[0]
    const isAdmin = user.role === 'admin'
    const isAuthor = entity['user'] && entity['user'].equals(user.id)
    entity.role = (isAuthor || isAdmin) ? user.role : 'guest'
    if (isAuthor || isAdmin || role === 'guest') {
      return entity
    }
    res.status(401).end()
  }
  return null
}
