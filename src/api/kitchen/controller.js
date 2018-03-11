import { success, notFound, authorOrAdmin } from '../../services/response/'
import { uploadImg } from '../../services/cloudinary'
import { Kitchen } from '.'

export const create = ({ user, bodymen: { body } }, res, next) => {
  body.verified = false;
  Kitchen.create({ ...body, user })
    .then((kitchen) => kitchen.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Kitchen.count(query)
    .then(count => Kitchen.find(query, select, cursor)
      .populate('user')
      .then((kitchens) => ({
        count,
        rows: kitchens.map((kitchen) => kitchen.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Kitchen.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((kitchen) => kitchen ? kitchen.view(true, true) : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Kitchen.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((kitchen) => kitchen ? Object.assign(kitchen, body).save() : null)
    .then((kitchen) => kitchen ? kitchen.view(true) : null)
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
          let { large, thumbnail } = result;
          if (kitchen) {
            kitchen.images = kitchen.images ? kitchen.images : [];
            kitchen.images.push({ large, thumbnail });
          }
          return kitchen.save();
        })
        .catch(err => err)
    )
    .then((kitchen) => kitchen ? kitchen.view(true) : null)
    .then(success(res))
    .catch(next)

export const findByUser = ({ params }, res, next) =>
  Kitchen.find({ user: { _id: params.userid } })
    .populate('user')
    .then(notFound(res))
    .then((kitchen) => kitchen ? kitchen[0].view(true, true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Kitchen.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((kitchen) => kitchen ? kitchen.remove() : null)
    .then(success(res, 204))
    .catch(next)
