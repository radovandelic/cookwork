import { success, notFound, authorOrAdmin } from '../../services/response/'
import { uploadImg } from '../../services/cloudinary'
import { sendKitchenChangeNotification } from '../../services/mailgun'
import { Kitchen } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Kitchen.create({ ...body, user })
    .then((kitchen) => kitchen.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor }, params }, res, next) =>
  Kitchen.count(query)
    .then(count => Kitchen.find(query, select, cursor)
      .populate('user')
      .then((kitchens) => ({
        count,
        rows: kitchens.map((kitchen) => kitchen.view())
      })
      )
    )
    .then(success(res))
    .catch(next)

export const show = ({ user, params }, res, next) =>
  Kitchen.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'guest'))
    .then((kitchen) => kitchen.view ? kitchen.view(true, kitchen.role) : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Kitchen.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((kitchen) => {
      for (let key in body) { if (!body[key] && body[key] !== false) delete body[key] }
      return kitchen ? Object.assign(kitchen, body).save() : null
    })
    .then((kitchen) => body.verified === true ? sendKitchenChangeNotification(kitchen.user, kitchen) : kitchen)
    .then((kitchen) => kitchen.view ? kitchen.view(true, kitchen.role) : null)
    .then(success(res))
    .catch(next)

export const updateImage = ({ user, bodymen: { body }, params }, res, next) =>
  Kitchen.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((kitchen) =>
      uploadImg(body.image)
        .then((result) => {
          let { large, thumbnail } = result
          if (kitchen) {
            kitchen.images = kitchen.images ? kitchen.images : []
            kitchen.images.push({ large, thumbnail })
            return kitchen.save()
          } else {
            return null
          }
        })
        .catch(err => err)
    )
    .then((kitchen) => kitchen.view ? kitchen.view(true, kitchen.role) : null)
    .then(success(res))
    .catch(next)

export const deleteImages = ({ user, bodymen: { body }, params }, res, next) =>
  Kitchen.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((kitchen) => {
      if (kitchen && body.images) {
        for (const image of body.images) {
          kitchen.images.pull({ _id: image._id })
        }
        return kitchen.save()
      } else {
        return null
      }
    })
    .then((kitchen) => kitchen.view ? kitchen.view(true, kitchen.role) : null)
    .then(success(res))
    .catch(next)

export const findByUser = ({ user, params }, res, next) =>
  Kitchen.find({ user: { _id: params.userid } })
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((kitchen) => kitchen.view ? kitchen.view(true, kitchen.role) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Kitchen.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((kitchen) => kitchen ? kitchen.remove() : null)
    .then(success(res, 204))
    .catch(next)
