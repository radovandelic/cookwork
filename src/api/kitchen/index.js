import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, updateImage, deleteImages, findByUser } from './controller'
import Kitchen, { schema } from './model'
export { Kitchen, schema }

const router = new Router()
const { name, phone, description, type, address, postalCode, region, size, AFSCA, VAT, days, hours, capacity, price,
  rent, equipment, staff, cancellation, events, standingCapacity, sittingCapacity, verified } = schema.tree
const image = { type: String }
const images = { type: Object }

/**
 * @api {post} /kitchens Create kitchen
 * @apiName CreateKitchen
 * @apiGroup Kitchen
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} [name] Kitchen's name.
 * @apiParam {String} phone Kitchen's phone.
 * @apiParam {String} [description] Kitchen's description.
 * @apiParam {String} type Kitchen's type.
 * @apiParam {String} address Kitchen's address.
 * @apiParam {String} region Kitchen's region.
 * @apiParam {Number} postalCode Kitchen's postal code.
 * @apiParam {Number} size Kitchen's size.
 * @apiParam {String} [AFSCA] Kitchen's AFSCA.
 * @apiParam {String} VAT Kitchen's VAT.
 * @apiParam {Object} days Kitchen's working weekdays. (e.g {daysFrom: 1, daysTo: 0})
 * @apiParam {Object} hours Kitchen's work hours. (e.g {hoursFrom: 0, hoursTo: 24})
 * @apiParam {Number} [capacity] Kitchen's capacity.
 * @apiParam {Number} price Kitchen's hourly price, excl. service fee and VAT.
 * @apiParam {Number} [rent] Kitchen's monthly price, excl. service fee and VAT.
 * @apiParam {Object} [equipment] Kitchen's equipment.
 * @apiParam {Object} [staff] Kitchen's additional services.
 * @apiParam {String} [cancellation] Kitchen's cancellation policy.
 * @apiParam {Boolean} [events] Kitchen's events.
 * @apiParam {Number} [standingCapacity] Kitchen's standing capacity for events.
 * @apiParam {Number} [sittingCapacity] Kitchen's sitting capacity for events.
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kitchen not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({
    name,
    phone,
    description,
    type,
    address,
    postalCode,
    region,
    size,
    AFSCA,
    VAT,
    days,
    hours,
    capacity,
    price,
    rent,
    equipment,
    staff,
    cancellation,
    events,
    standingCapacity,
    sittingCapacity,
    verified: false
  }),
  create)

/**
 * @api {get} /kitchens Retrieve kitchens
 * @apiName RetrieveKitchens
 * @apiGroup Kitchen
 * @apiParam {Boolean} [verified] kitchen verification status.
 * @apiParam {String} [region] kitchen region.
 * @apiParam {String} [type] kitchen type.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of kitchens.
 * @apiSuccess {Object[]} rows List of kitchens.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    verified: { type: Boolean, paths: ['verified'] },
    region: { type: String, paths: ['region'] },
    type: { type: String, paths: ['type'] }
  }),
  index)

/**
 * @api {get} /kitchens/:id Retrieve kitchen
 * @apiName RetrieveKitchen
 * @apiGroup Kitchen
 * @apiParam {String} [access_token] user access token for full view.
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kitchen not found.
 */
router.get('/:id',
  token({ required: false }),
  show)

/**
 * @api {put} /kitchens/:id Update kitchen
 * @apiName UpdateKitchen
 * @apiGroup Kitchen
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} [name] Kitchen's name.
 * @apiParam {String} phone Kitchen's phone.
 * @apiParam {String} [description] Kitchen's description.
 * @apiParam {String} type Kitchen's type.
 * @apiParam {String} address Kitchen's address.
 * @apiParam {String} region Kitchen's region.
 * @apiParam {Number} postalCode Kitchen's postal code.
 * @apiParam {Number} size Kitchen's size.
 * @apiParam {String} [AFSCA] Kitchen's AFSCA.
 * @apiParam {String} VAT Kitchen's VAT.
 * @apiParam {Object} days Kitchen's working weekdays. (e.g {daysFrom: 1, daysTo: 0})
 * @apiParam {Object} hours Kitchen's work hours. (e.g {hoursFrom: 0, hoursTo: 24})
 * @apiParam {Number} [capacity] Kitchen's capacity.
 * @apiParam {Number} price Kitchen's hourly price, excl. service fee and VAT.
 * @apiParam {Number} [rent] Kitchen's monthly price, excl. service fee and VAT.
 * @apiParam {Object} [equipment] Kitchen's equipment.
 * @apiParam {Object} [staff] Kitchen's additional services.
 * @apiParam {String} [cancellation] Kitchen's cancellation policy.
 * @apiParam {Boolean} [events] Kitchen's events.
 * @apiParam {Number} [standingCapacity] Kitchen's standing capacity for events.
 * @apiParam {Number} [sittingCapacity] Kitchen's sitting capacity for events.
 * @apiParam {Boolean} [verified] Kitchen's verification status.
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kitchen not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({
    name,
    phone,
    description,
    type,
    address,
    postalCode,
    region,
    size,
    AFSCA,
    VAT,
    days,
    hours,
    capacity,
    price,
    rent,
    equipment,
    staff,
    cancellation,
    events,
    standingCapacity,
    sittingCapacity,
    verified
  }),
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

/**
 * @api {post} /kitchens/:id/images/upload Upload kitchen image
 * @apiName UploadImage
 * @apiGroup Kitchen
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} image Image to be added (data-uri).
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 * @apiError 404 Kitchen not found.
 */
router.put('/:id/images/upload',
  token({ required: true }),
  body({ image }),
  updateImage)

/**
 * @api {post} /kitchens/:id/images/delete Delete kitchen image(s)
 * @apiName DeleteImages
 * @apiGroup Kitchen
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {Object[]} images Image(s) to be deleted.
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 * @apiError 404 Kitchen not found.
 */
router.delete('/:id/images/delete',
  token({ required: true }),
  body({ images }),
  deleteImages)

/**
 * @api {post} /kitchens/user/:userid Find kitcher by user id
 * @apiName FindByUser
 * @apiGroup Kitchen
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} kitchen Kitchen's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Kitchen not found.
 */
router.get('/user/:userid/',
  token({ required: true }),
  findByUser)

export default router
