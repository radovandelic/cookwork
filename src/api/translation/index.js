import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { createAndTranslate, create, index, show } from './controller'
import Translation, { schema } from './model'
export { Translation, schema }

const router = new Router()
const { translations } = schema.tree

/**
 * @api {post} /translations Create translation
 * @apiName CreateTranslation
 * @apiGroup Translation
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam translations Translation's translations.
 * @apiSuccess {Object} translation Translation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Translation not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ translations }),
  create)

router.post('/init',
  token({ required: true, roles: ['admin'] }),
  body({ translations }),
  createAndTranslate)

/**
 * @api {get} /translations Retrieve translations
 * @apiName RetrieveTranslations
 * @apiGroup Translation
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of translations.
 * @apiSuccess {Object[]} rows List of translations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /translations/:id Retrieve translation
 * @apiName RetrieveTranslation
 * @apiGroup Translation
 * @apiSuccess {Object} translation Translation's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Translation not found.
 */
router.get('/:id',
  show)

export default router
