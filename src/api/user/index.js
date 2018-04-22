import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, master, token } from '../../services/passport'
import { index, showMe, show, register, create, update, updatePassword, verifyAccount, destroy } from './controller'
import { masterKey } from '../../config'
import User, { schema } from './model'
export { User, schema }

const router = new Router()
const { email, region, phone, password, name, picture, role, firstName, lastName, lang, kitchenOwner, activity,
  verifyToken, verified } = schema.tree

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me',
  token({ required: true }),
  showMe)

/**
* @api {get} /users/:id/:token Verify user account
* @apiName VerifyUser
* @apiGroup User
* @apiPermission public
* @apiSuccess {Object} user User's data.
* @apiError 404 User or verification token not found.
*/
router.get('/verify/:id/:token',
  verifyAccount)

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id',
  show)

/**
 * @api {post} /users/register Register new user
 * @apiName RegisterUser
 * @apiGroup User
 * @apiPermission public
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [phone] User's phone.
 * @apiParam {String} [firstName] User's first name.
 * @apiParam {String} [lastName] User's last name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {Boolean} [kitchenOwner=false] User is kitchen owner or not.
 * @apiParam {String} [lang="fr"] User's language preference.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/register',
  body({
    email,
    password,
    name,
    phone,
    firstName,
    lastName,
    picture,
    role: 'user',
    lang,
    kitchenOwner,
    access_token: masterKey,
    verified: false
  }),
  register)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiPermission master
 * @apiParam {String} access_token Master access_token.
 * @apiParam {String} email User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [phone] User's phone.
 * @apiParam {String} [firstName] User's first name.
 * @apiParam {String} [lastName] User's last name.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {Boolean} [kitchenOwner=false] User is kitchen owner or not.
 * @apiParam {String=user,admin} [role=user] User's role.
 * @apiParam {String} [lang="fr"] User's language preference.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Master access only.
 * @apiError 409 Email already registered.
 */
router.post('/',
  master(),
  body({ email, password, phone, name, firstName, lastName, picture, role, lang, kitchenOwner, verifyToken, verified }),
  create)

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} [phone] User's phone.
 * @apiParam {String} [firstName] User's first name.
 * @apiParam {String} [lastName] User's last name.
 * @apiParam {String} [region] User's home region.
 * @apiParam {String} [activity] User's professional activity.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {Boolean} [kitchenOwner] User is kitchen owner or not.
 * @apiParam {String} [lang] User's language preference.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, region, firstName, lastName, kitchenOwner, activity, picture, phone, lang }),
  update)

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword)

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
