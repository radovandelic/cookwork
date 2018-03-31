import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { createAndTranslate, create, index, show } from './controller'
import Translation, { schema } from './model'
export { Translation, schema }

/**
|--------------------------------------------------
| Nothing to see here. Get out. Now.
|--------------------------------------------------
*/

const router = new Router()
const { translations } = schema.tree

router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ translations }),
  create)

router.post('/init',
  token({ required: true, roles: ['admin'] }),
  body({ translations }),
  createAndTranslate)

router.get('/',
  query(),
  index)

router.get('/:id',
  show)

export default router
