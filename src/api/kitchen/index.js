import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import Kitchen, { schema } from './model'
export { Kitchen, schema }

const router = new Router()
const { name, phone, description, type, address, size, AFSCA, VAT, hours, capacity, price, rent, equipment, staff, cancellation, events, standingCapacity, sittingCapacity } = schema.tree

/**
 * @api {post} /kitchens Create kitchen
 * @apiName CreateKitchen
 * @apiGroup Kitchen
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Kitchen's name.
 * @apiParam phone Kitchen's phone.
 * @apiParam description Kitchen's description.
 * @apiParam type Kitchen's type.
 * @apiParam address Kitchen's address.
 * @apiParam size Kitchen's size.
 * @apiParam AFSCA Kitchen's AFSCA.
 * @apiParam VAT Kitchen's VAT.
 * @apiParam hours Kitchen's hours.
 * @apiParam capacity Kitchen's capacity.
 * @apiParam price Kitchen's price.
 * @apiParam rent Kitchen's rent.
 * @apiParam equipment Kitchen's equipment.
 * @apiParam staff Kitchen's staff.
 * @apiParam cancellation Kitchen's cancellation.
 * @apiParam events Kitchen's events.
 * @apiParam standingCapacity Kitchen's standingCapacity.
 * @apiParam sittingCapacity Kitchen's sittingCapacity.
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kitchen not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, phone, description, type, address, size, AFSCA, VAT, hours, capacity, price, rent, equipment, staff, cancellation, events, standingCapacity, sittingCapacity }),
  create)

/**
 * @api {get} /kitchens Retrieve kitchens
 * @apiName RetrieveKitchens
 * @apiGroup Kitchen
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of kitchens.
 * @apiSuccess {Object[]} rows List of kitchens.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /kitchens/:id Retrieve kitchen
 * @apiName RetrieveKitchen
 * @apiGroup Kitchen
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kitchen not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /kitchens/:id Update kitchen
 * @apiName UpdateKitchen
 * @apiGroup Kitchen
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Kitchen's name.
 * @apiParam phone Kitchen's phone.
 * @apiParam description Kitchen's description.
 * @apiParam type Kitchen's type.
 * @apiParam address Kitchen's address.
 * @apiParam size Kitchen's size.
 * @apiParam AFSCA Kitchen's AFSCA.
 * @apiParam VAT Kitchen's VAT.
 * @apiParam hours Kitchen's hours.
 * @apiParam capacity Kitchen's capacity.
 * @apiParam price Kitchen's price.
 * @apiParam rent Kitchen's rent.
 * @apiParam equipment Kitchen's equipment.
 * @apiParam staff Kitchen's staff.
 * @apiParam cancellation Kitchen's cancellation.
 * @apiParam events Kitchen's events.
 * @apiParam standingCapacity Kitchen's standingCapacity.
 * @apiParam sittingCapacity Kitchen's sittingCapacity.
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kitchen not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, phone, description, type, address, size, AFSCA, VAT, hours, capacity, price, rent, equipment, staff, cancellation, events, standingCapacity, sittingCapacity }),
  update)

/**
 * @api {delete} /kitchens/:id Delete kitchen
 * @apiName DeleteKitchen
 * @apiGroup Kitchen
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Kitchen not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
