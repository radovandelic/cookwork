import { success, notFound } from '../../services/response/'
import { sendInfoToStaff } from '../../services/mailgun'
import { Info } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Info.create({ ...body, user })
    .then((info) => sendInfoToStaff(info, user))
    .then((info) => info.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Info.count(query)
    .then(count => Info.find(query, select, cursor)
      .populate('user')
      .then((infos) => ({
        count,
        rows: infos.map((info) => info.view(true))
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Info.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((info) => info ? info.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Info.findById(params.id)
    .then(notFound(res))
    .then((info) => info ? info.remove() : null)
    .then(success(res, 204))
    .catch(next)
