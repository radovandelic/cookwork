import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Order } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Order.create({ ...body, user })
    .then((order) => order.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Order.count(query)
    .then(count => Order.find(query, select, cursor)
      .populate('user')
      .then((orders) => ({
        count,
        rows: orders.map((order) => order.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Order.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((order) => order ? order.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Order.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((order) => order ? Object.assign(order, body).save() : null)
    .then((order) => order ? order.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((order) => order ? order.remove() : null)
    .then(success(res, 204))
    .catch(next)
