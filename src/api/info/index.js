import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, destroy } from './controller'
import Info, { schema } from './model'
export { Info, schema }

const router = new Router()
const { activity, purpose, region, phone, type, dateFrom, dateTo, daysFrom, daysTo, hoursFrom, hoursTo, comments } = schema.tree

/**
 * @api {post} /infos Create info
 * @apiName CreateInfo
 * @apiGroup Info
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} activity User's activity.
 * @apiParam {String} [purpose] User's renting purpose.
 * @apiParam {String} [region] User's target region.
 * @apiParam {String} [phone] User's phone.
 * @apiParam {String} [type] User's target kitchen type.
 * @apiParam {Date} [dateFrom] User's dateFrom.
 * @apiParam {Date} [dateTo] User's dateTo.
 * @apiParam {Number} [daysFrom] User's daysFrom.
 * @apiParam {Number} [daysTo] User's daysTo.
 * @apiParam {Number} [hoursFrom] User's hoursFrom.
 * @apiParam {Number} [hoursTo] User's hoursTo.
 * @apiParam {String} [comments] User's comments.
 * @apiSuccess {Object} info Info's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Info not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ activity, purpose, region, phone, type, dateFrom, dateTo, daysFrom, daysTo, hoursFrom, hoursTo, comments }),
  create)

/**
 * @api {get} /infos Retrieve infos
 * @apiName RetrieveInfos
 * @apiGroup Info
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of infos.
 * @apiSuccess {Object[]} rows List of infos.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /infos/:id Retrieve info
 * @apiName RetrieveInfo
 * @apiGroup Info
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} info Info's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Info not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {delete} /infos/:id Delete info
 * @apiName DeleteInfo
 * @apiGroup Info
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Info not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
