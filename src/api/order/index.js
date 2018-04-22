import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import Order, { schema } from './model'
export { Order, schema }

const router = new Router()
const { type, dateFrom, dateTo, daysFrom, daysTo, hoursFrom, hoursTo, totalDays, totalHours, totalPrice, kitchen } = schema.tree

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String="once", "recurring", "long"} type Order's type.
 * @apiParam {Date} [dateFrom] Order's dateFrom.
 * @apiParam {Date} [dateTo] Order's dateTo.
 * @apiParam {Number} [daysFrom] Order's daysFrom.
 * @apiParam {Number} [daysTo] Order's daysTo.
 * @apiParam {Number} [hoursFrom] Order's hoursFrom.
 * @apiParam {Number} [hoursTo] Order's hoursTo.
 * @apiParam {Number} [totalDays] Order's totalDays.
 * @apiParam {Number} [totalHours] Order's totalHours.
 * @apiParam {Number} [totalPrice] Order's totalPrice.
 * @apiParam {Object} kitchen Order's kitchen.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ type, dateFrom, dateTo, daysFrom, daysTo, hoursFrom, hoursTo, totalDays, totalHours, totalPrice, kitchen }),
  create)

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of orders.
 * @apiSuccess {Object[]} rows List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String="once", "recurring", "long"} type Order's type.
 * @apiParam {Date} [dateFrom] Order's dateFrom.
 * @apiParam {Date} [dateTo] Order's dateTo.
 * @apiParam {Number} [daysFrom] Order's daysFrom.
 * @apiParam {Number} [daysTo] Order's daysTo.
 * @apiParam {Number} [hoursFrom] Order's hoursFrom.
 * @apiParam {Number} [hoursTo] Order's hoursTo.
 * @apiParam {Number} [totalDays] Order's totalDays.
 * @apiParam {Number} [totalHours] Order's totalHours.
 * @apiParam {Number} [totalPrice] Order's totalPrice.
 * @apiParam {Object} kitchen Order's kitchen.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ type, dateFrom, dateTo, daysFrom, daysTo, hoursFrom, hoursTo, totalDays, totalHours, totalPrice, kitchen }),
  update)

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
