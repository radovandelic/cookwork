import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Kitchen } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, kitchen

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  kitchen = await Kitchen.create({ user })
})

test('POST /kitchens 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', phone: 'test', description: 'test', type: 'test', address: 'test', size: 'test', AFSCA: 'test', VAT: 'test', hours: 'test', capacity: 'test', price: 'test', rent: 'test', equipment: 'test', staff: 'test', cancellation: 'test', events: 'test', standingCapacity: 'test', sittingCapacity: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.size).toEqual('test')
  expect(body.AFSCA).toEqual('test')
  expect(body.VAT).toEqual('test')
  expect(body.hours).toEqual('test')
  expect(body.capacity).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.rent).toEqual('test')
  expect(body.equipment).toEqual('test')
  expect(body.staff).toEqual('test')
  expect(body.cancellation).toEqual('test')
  expect(body.events).toEqual('test')
  expect(body.standingCapacity).toEqual('test')
  expect(body.sittingCapacity).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /kitchens 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /kitchens 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /kitchens/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${kitchen.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kitchen.id)
})

test('GET /kitchens/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /kitchens/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${kitchen.id}`)
    .send({ access_token: userSession, name: 'test', phone: 'test', description: 'test', type: 'test', address: 'test', size: 'test', AFSCA: 'test', VAT: 'test', hours: 'test', capacity: 'test', price: 'test', rent: 'test', equipment: 'test', staff: 'test', cancellation: 'test', events: 'test', standingCapacity: 'test', sittingCapacity: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(kitchen.id)
  expect(body.name).toEqual('test')
  expect(body.phone).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.address).toEqual('test')
  expect(body.size).toEqual('test')
  expect(body.AFSCA).toEqual('test')
  expect(body.VAT).toEqual('test')
  expect(body.hours).toEqual('test')
  expect(body.capacity).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.rent).toEqual('test')
  expect(body.equipment).toEqual('test')
  expect(body.staff).toEqual('test')
  expect(body.cancellation).toEqual('test')
  expect(body.events).toEqual('test')
  expect(body.standingCapacity).toEqual('test')
  expect(body.sittingCapacity).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /kitchens/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${kitchen.id}`)
    .send({ access_token: anotherSession, name: 'test', phone: 'test', description: 'test', type: 'test', address: 'test', size: 'test', AFSCA: 'test', VAT: 'test', hours: 'test', capacity: 'test', price: 'test', rent: 'test', equipment: 'test', staff: 'test', cancellation: 'test', events: 'test', standingCapacity: 'test', sittingCapacity: 'test' })
  expect(status).toBe(401)
})

test('PUT /kitchens/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${kitchen.id}`)
  expect(status).toBe(401)
})

test('PUT /kitchens/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, name: 'test', phone: 'test', description: 'test', type: 'test', address: 'test', size: 'test', AFSCA: 'test', VAT: 'test', hours: 'test', capacity: 'test', price: 'test', rent: 'test', equipment: 'test', staff: 'test', cancellation: 'test', events: 'test', standingCapacity: 'test', sittingCapacity: 'test' })
  expect(status).toBe(404)
})

test('DELETE /kitchens/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kitchen.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /kitchens/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kitchen.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /kitchens/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${kitchen.id}`)
  expect(status).toBe(401)
})

test('DELETE /kitchens/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
